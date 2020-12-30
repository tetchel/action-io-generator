## action-io-generator

This is a utility to generate JavaScript/TypeScript enums from an `action.yml` file. It can be invoked as a command-line tool or programmatically.

By using this tool, you can reduce duplication and the errors that come with it by allowing the `action.yml` to work as the single source of truth for your action's inputs and outputs. This reduces the maintainence required to add, edit, and remove inputs or outputs, and ensures everything is named correctly.

## Usage

```sh
$ npm i -D https://github.com/tetchel/action-io-generator/releases/download/v0.1.0/action-io-generator-v0.1.0.tar.gz
$ npx action-io-generator --actionYml ./action.yml --outFile ./src/generated/inputs-outputs.ts
Loading action file from ./action.yml
Writing input and output enums to src/generated/inputs-outputs.ts
Found 8 inputs and 0 outputs.
Outputting input and output enums to src/generated/inputs-outputs.ts
```
