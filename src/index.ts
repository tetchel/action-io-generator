import * as path from "path";
import * as minimist from "minimist";

import { loadActionYml, outputEnums } from "./generator/generator";
import * as logger from "./util/logger";

export async function generate(actionYmlFile: string, outFile: string): Promise<string> {
    if (!path.extname(outFile)) {
        throw new Error(`Output file must be a TypeScript or JavaScript file`);
    }

    const actionYml = await loadActionYml(actionYmlFile);

    const inputs = Object.entries(actionYml.inputs || []);
    const outputs = Object.entries(actionYml.outputs || []);

    logger.log(`Found ${inputs.length} inputs and ${outputs.length} outputs.`);

    await outputEnums(outFile, inputs, outputs);

    return outFile;
}

export async function cli(): Promise<void> {
    const minimistOptions: minimist.Opts = {
        alias: {
            a: "actionYml",
            s: "silent",
            o: "outFile",
        },
        boolean: [ "silent" ]
    };
    const args = minimist(process.argv.slice(2), minimistOptions);

    logger.setSilent(args.silent);

    let actionYmlFile = args.actionYml;
    if (!actionYmlFile) {
        logger.log(`No action.yml path provided, looking in working directory`);
        actionYmlFile = path.resolve(process.cwd(), "action.yml");
    }
    logger.log(`Loading action file from ${actionYmlFile}`);

    let outFile = args.outFile;
    if (!outFile) {
        outFile = path.resolve(process.cwd(), "inputs-outputs.ts");
    }
    logger.log(`Writing input and output enums to ${outFile}`);

    await generate(actionYmlFile, outFile);
}

if (require.main === module) {
    cli()
    .then(() => {
        logger.log(`Success.`);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
else {
    logger.setSilent(true);
}
// else, this file was require'd and we leave it to the client to call generate().
