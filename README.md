<div align="center">

<a href="https://wolfstar.rocks" target="_blank"><img src="https://cdn.wolfstar.rocks/img/wolfstar.png" alt="WolfStar Project Logo" height="100" /></a>

# WolfStar Project GitHub Metadata

**Metadata files such as issue templates for the [WolfStar Project github organisation][wolfstarprojectghurl].**

[![GitHub](https://img.shields.io/github/license/wolfstar-project/.github)](https://github.com/wolfstar-project/.github/blob/main/LICENSE.md)

</div>

## Reusable Workflows

This repository contains reusable workflows for various purposes. These workflows are defined in YAML files and can be
used across multiple repositories within the WolfStar Project organization.

### Continuous Integration Workflow

The `reusable-ci.yml` workflow is designed for continuous integration. It includes steps for checking out the code,
setting up Node.js, installing dependencies, and running tests.

### Release Workflow

The `reusable-publish.yml` workflow is designed for releasing stable Docker images. It includes steps for building and
publishing Docker images.

### Testing Workflow

The `reusable-test.yml` workflow is designed for testing. It includes steps for checking out the code, setting up
Node.js, installing dependencies, and running tests.

### Continuous Deployment Workflow

The `reusable-cd.yml` workflow is designed for continuous deployment. It includes steps for deploying Docker images.

[wolfstarprojectghurl]: https://github.com/wolfstar-project
