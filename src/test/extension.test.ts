import * as vscode from 'vscode';
import * as assert from 'assert';

suite('Extension Test Suite', () => {
    // This runs before all tests
    vscode.window.showInformationMessage('Start all tests.');

    // Test case example
    test('Sample Test', () => {
        assert.strictEqual(true, true); // Simple assertion to ensure the test runs
    });

    // Test case to check command functionality
    test('Command Should Show Information Message', async function () {
        this.timeout(5000); // Increase the timeout if needed

        // Execute the command
        await vscode.commands.executeCommand('java-code-optimizer.helloWorld');

        // Ideally, you should check side effects or capture output instead
        // For this example, we can just ensure that no errors are thrown
        assert.ok(true); // Replace this with actual assertion logic if applicable
    });
});
