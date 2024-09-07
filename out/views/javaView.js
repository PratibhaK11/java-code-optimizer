"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showDSAVisualCues = showDSAVisualCues;
exports.showDSAOptimizationReport = showDSAOptimizationReport;
const vscode = require("vscode");
// Show DSA-related visual cues in the editor
function showDSAVisualCues(diagnostics, editor) {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('javaDSA');
    diagnosticCollection.set(editor.document.uri, diagnostics);
    const decorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 165, 0, 0.2)', // Light orange background for DSA inefficiencies
        borderWidth: '1px',
        borderColor: 'orange',
        borderStyle: 'solid'
    });
    const ranges = diagnostics.map(diagnostic => diagnostic.range);
    editor.setDecorations(decorationType, ranges);
}
// Generate and show optimization report with DSA-specific changes
function showDSAOptimizationReport(originalCode, optimizedCode) {
    const outputChannel = vscode.window.createOutputChannel("DSA Optimization Report");
    outputChannel.show();
    outputChannel.appendLine("### DSA Optimization Report ###");
    outputChannel.appendLine("### Before Optimization ###");
    outputChannel.appendLine(originalCode);
    outputChannel.appendLine("\n### After Optimization ###");
    outputChannel.appendLine(optimizedCode);
    // Placeholder for actual diff generation
    const diff = generateDiff(originalCode, optimizedCode);
    outputChannel.appendLine("\n### Changes ###");
    outputChannel.appendLine(diff);
    outputChannel.appendLine("\n### DSA-Specific Improvements ###");
    outputChannel.appendLine("Detected inefficient sorting algorithms, graph traversals, and string operations and provided optimized suggestions.");
}
// Generate a diff between original and optimized code (stub for demo purposes)
function generateDiff(originalCode, optimizedCode) {
    return "Diff generation not implemented"; // Placeholder for actual diff logic
}
//# sourceMappingURL=javaView.js.map