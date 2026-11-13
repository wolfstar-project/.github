import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { GitHub } from '../src/github.ts';

const realFetch = globalThis.fetch;
afterEach(() => {
	globalThis.fetch = realFetch;
});

function stubCompare(total: number): { pages: () => number } {
	let pages = 0;
	globalThis.fetch = (async (url: URL | string) => {
		pages++;
		const page = Number(new URL(String(url)).searchParams.get('page'));
		const count = Math.max(0, Math.min(100, total - (page - 1) * 100));
		const commits = Array.from({ length: count }, (_, index) => ({ sha: `${page}-${index}`, commit: { message: '' } }));
		return new Response(JSON.stringify({ commits }));
	}) as typeof fetch;
	return { pages: () => pages };
}

describe('commit range', () => {
	it('reads every page of a range over 300 commits', async () => {
		const stub = stubCompare(742);
		const commits = await new GitHub('o/r', '').commitsBetween('v1', 'v2');
		assert.equal(commits.length, 742);
		assert.equal(stub.pages(), 8);
	});

	it('fails instead of returning a partial range', async () => {
		stubCompare(1_000_000);
		await assert.rejects(new GitHub('o/r', '').commitsBetween('v1', 'v2'), /spans more than 5000 commits/);
	});
});
