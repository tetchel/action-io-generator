## action-io-generator

[![CI](https://github.com/tetchel/action-io-generator/workflows/CI/badge.svg)](https://github.com/tetchel/action-io-generator/actions?query=workflow%3ACI)

[![tag badge](https://img.shields.io/github/v/tag/tetchel/action-io-generator)](https://github.com/tetchel/action-io-generator/tags)
[![license badge](https://img.shields.io/github/license/tetchel/action-io-generator)](./LICENSE)

This is a utility to generate JavaScript/TypeScript enums from an `action.yml` file. It can be invoked as a command-line tool or programmatically.

By using this tool, you can reduce duplication and the errors that come with it by allowing the `action.yml` to work as the single source of truth for your action's inputs and outputs. This reduces the maintainence required to add, edit, and remove inputs or outputs, and ensures everything is named correctly.

## Install

```bash
$ npm i -D https://github.com/tetchel/action-io-generator/releases/download/v0.1.0/action-io-generator-v0.1.0.tar.gz
```

## Usage
```bash
$ npx action-io-generator --actionYml ./action.yml --outFile ./src/generated/inputs-outputs.ts
Loading action file from ./action.yml
Found 8 inputs and 0 outputs.
Outputting input and output enums to src/generated/inputs-outputs.ts
```

## Example
See [test](./test) for an example. [generated/inputs-outputs.ts](./test/generated/inputs-outputs.ts) is generated from [test.action.yml](/test/test.action.yml).

```yaml
inputs:
  foo:
    required: true
    description: This is the foo input.
    default: foo-default
```

becomes:

```js
export enum Inputs {
    /**
     * This is the foo input.
     * Required: true
     * Default: "foo-default"
     */
    FOO = "foo",
}
```

## Options
The only required option is `-o / --outFile`.

| Short | Long | Default | Description |
| ----  | ---- | ------- | ----------- |
| `-o`  | `--outFile` | **None** | JS/TS file to write out enums to. |
| `-a`  | `--actionYml` | `./action.yml` | Path to `action.yml` to process into enums. |
| `-s`  | `--silent` | `false` | Produce no output, except errors to stderr. |
| `-w`  | `--watch` | `false` | Keep running, re-running the generator each time the `actionYml` is edited. |
