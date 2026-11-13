import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { afterImages, cleanBody, evidenceFrom, isDependencyUpdate, isGitHubImage, mergedPulls } from '../src/collect.ts';
import type { PullRequest } from '../src/github.ts';

const EVIDENCE = `Checked the visible change in the running app.

| Before | After |
| --- | --- |
| ![Before](https://github.com/user-attachments/assets/aaaa) | ![After](https://github.com/user-attachments/assets/bbbb) |
| <img src="https://github.com/user-attachments/assets/cccc"> | <img alt="After" src="https://github.com/user-attachments/assets/dddd" /> |`;

describe('pr-evidence screenshots', () => {
	it('takes the After column of the table', () => {
		assert.deepEqual(afterImages(EVIDENCE), [
			'https://github.com/user-attachments/assets/bbbb',
			'https://github.com/user-attachments/assets/dddd'
		]);
	});

	it('falls back to images labelled After', () => {
		assert.deepEqual(
			afterImages(
				'![after-1a2b3c4](https://github.com/user-attachments/assets/eeee)\n![before](https://github.com/user-attachments/assets/ffff)'
			),
			['https://github.com/user-attachments/assets/eeee']
		);
	});

	it('ignores images GitHub does not host', () => {
		assert.equal(isGitHubImage('https://evil.example/after.png'), false);
		assert.equal(isGitHubImage('https://github.com/wolfstar-project/x/raw/main/a.png'), false);
		assert.deepEqual(afterImages('| Before | After |\n| - | --- |\n| ![a](https://i.imgur.com/a.png) | ![b](https://i.imgur.com/b.png) |'), []);
	});

	it('prefers the newest comment', () => {
		const evidence = evidenceFrom({ number: 7, body: '' }, [
			{ body: EVIDENCE, created_at: '2026-11-01T00:00:00Z', user: null },
			{ body: EVIDENCE.replace('bbbb', 'zzzz').replace('dddd', 'yyyy'), created_at: '2026-11-02T00:00:00Z', user: null }
		]);
		assert.deepEqual(evidence, {
			pr: 7,
			images: ['https://github.com/user-attachments/assets/zzzz', 'https://github.com/user-attachments/assets/yyyy']
		});
		assert.equal(evidenceFrom({ number: 8, body: 'no images' }, []), null);
	});
});

describe('pull request text', () => {
	it('drops comments, images, and the AI disclosure', () => {
		const body = cleanBody('Why\n<!-- template -->\n![shot](https://x/y.png)\n\n\n\n> 🤖 AI disclosure: Claude Code was used.');
		assert.equal(body, 'Why');
	});

	it('recognises dependency updates', () => {
		assert.equal(isDependencyUpdate({ title: 'fix(deps): update dependency ink to v8', user: null }), true);
		assert.equal(isDependencyUpdate({ title: 'chore: lock file maintenance', user: { login: 'renovate[bot]', type: 'Bot' } }), true);
		assert.equal(isDependencyUpdate({ title: 'feat: add /note', user: { login: 'RedStar071' } }), false);
	});
});

describe('merged pull requests', () => {
	const pull = (number: number, base: string, head: string): PullRequest =>
		({
			number,
			title: `fix: ${number}`,
			body: null,
			html_url: '',
			merged_at: '2026-11-01T00:00:00Z',
			user: null,
			labels: [],
			base: { ref: base },
			head: { ref: head }
		}) as PullRequest;
	const options = { releaseBranches: ['release'], defaultBranch: 'main', sleep: async () => {} };
	const commits =
		(...shas: string[]) =>
		async () =>
			shas.map((sha) => ({ sha, commit: { message: sha } }));

	it('drops the main-into-release rollup and keeps a hotfix merged into release', async () => {
		const byCommit: Record<string, PullRequest[]> = {
			aaaaaaa: [pull(10, 'main', 'feature'), pull(12, 'release', 'main')],
			bbbbbbb: [pull(11, 'release', 'hotfix/crash'), pull(12, 'release', 'main')]
		};
		const github = { commitsBetween: commits('aaaaaaa', 'bbbbbbb'), pullsForCommit: async (sha: string) => byCommit[sha]! };
		const found = await mergedPulls(github, 'v1', 'v2', options);
		assert.deepEqual(
			found.map((pr) => pr.number),
			[10, 11]
		);
	});

	it('retries a failed lookup', async () => {
		let calls = 0;
		const github = {
			commitsBetween: commits('aaaaaaa'),
			pullsForCommit: async () => {
				if (++calls < 3) throw new Error('GitHub 502');
				return [pull(10, 'main', 'feature')];
			}
		};
		assert.deepEqual(
			(await mergedPulls(github, 'v1', 'v2', options)).map((pr) => pr.number),
			[10]
		);
	});

	it('fails the collection when a lookup keeps failing', async () => {
		const github = {
			commitsBetween: commits('aaaaaaa'),
			pullsForCommit: async (): Promise<PullRequest[]> => {
				throw new Error('GitHub 403 rate limit');
			}
		};
		await assert.rejects(mergedPulls(github, 'v1', 'v2', options), /commit aaaaaaa.*rate limit/);
	});
});
