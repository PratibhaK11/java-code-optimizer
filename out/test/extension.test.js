"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const assert = require("assert");
suite('Extension Test Suite', () => {
    // This runs before all tests
    vscode.window.showInformationMessage('Start all tests.');
    // Test case example
    test('Sample Test', () => {
        assert.strictEqual(true, true); // Simple assertion to ensure the test runs
    });
    // Test case to check command functionality
    test('Command Should Show Information Message', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(5000); // Increase the timeout if needed
            // Execute the command
            yield vscode.commands.executeCommand('java-code-optimizer.helloWorld');
            // Ideally, you should check side effects or capture output instead
            // For this example, we can just ensure that no errors are thrown
            assert.ok(true); // Replace this with actual assertion logic if applicable
        });
    });
});
//# sourceMappingURL=extension.test.js.map