import * as path from 'path';
import { runTests } from 'vscode-test';

async function main() {
    try {
        // The path to the extension under test
        const extensionDevelopmentPath = path.resolve(__dirname, '../../../');

        // The path to the test script
        const extensionTestsPath = path.resolve(__dirname, './extension.test');

        // Run the tests
        await runTests({ extensionDevelopmentPath, extensionTestsPath });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
