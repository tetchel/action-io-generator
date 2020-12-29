import * as path from "path";

import { generate } from "../dist";

(async function() {
    const TEST_FILE = path.join(__dirname, "test.action.yml");
    const TEST_OUTPUT = path.join(__dirname, "generated", "inputs-outputs.ts");

    await generate(TEST_FILE, TEST_OUTPUT);
})()
.catch((err) => {
    console.error(err);
    process.exit(1);
});
