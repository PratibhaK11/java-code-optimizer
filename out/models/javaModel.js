"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeDSA = analyzeDSA;
const vscode = require("vscode");
// Create diagnostic messages
function createDiagnostic(startIndex, length, message) {
    const editor = vscode.window.activeTextEditor;
    const startPos = editor === null || editor === void 0 ? void 0 : editor.document.positionAt(startIndex);
    const endPos = editor === null || editor === void 0 ? void 0 : editor.document.positionAt(startIndex + length);
    const range = new vscode.Range(startPos, endPos);
    return new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
}
// Analyze Java code for common DSA inefficiencies
function analyzeDSA(javaCode) {
    const diagnostics = [];
    // Sorting algorithms detection
    diagnostics.push(...analyzeSortingAlgorithms(javaCode));
    // Search algorithms detection
    diagnostics.push(...analyzeSearchAlgorithms(javaCode));
    // Graph algorithms detection
    diagnostics.push(...analyzeGraphAlgorithms(javaCode));
    // String operations detection
    diagnostics.push(...analyzeStringOperations(javaCode));
    // Trie operations detection
    diagnostics.push(...analyzeTrieOperations(javaCode));
    return diagnostics;
}
// Sorting algorithms detection
function analyzeSortingAlgorithms(javaCode) {
    const diagnostics = [];
    const inefficientSortingPatterns = [
        {
            name: "Bubble Sort",
            pattern: /for\s*\(.*i\s*=\s*0.*i\s*<\s*\w+.length.*for\s*\(.*j\s*=\s*i.*\)\s*\{(?:[^{}]*\{[^{}]*\})+/g,
            message: "Bubble sort detected. Consider using more efficient sorting algorithms like MergeSort, QuickSort, or HeapSort."
        },
        {
            name: "Selection Sort",
            pattern: /for\s*\(.*i\s*=\s*0.*i\s*<\s*\w+.length.*for\s*\(.*j\s*=\s*i.*\)\s*\{(?:[^{}]*swap[^{}]*)+/g,
            message: "Selection sort detected. Consider using more efficient sorting algorithms like MergeSort, QuickSort, or HeapSort."
        },
        {
            name: "Insertion Sort",
            pattern: /for\s*\(.*i\s*=\s*1.*i\s*<\s*\w+.length.*while\s*\(\s*j.*>=\s*0.*&&.*arr\[j\].*\)/g,
            message: "Insertion sort detected. Consider using more efficient sorting algorithms like MergeSort, QuickSort, or HeapSort."
        }
    ];
    inefficientSortingPatterns.forEach((sortingAlgorithm) => {
        let match;
        while ((match = sortingAlgorithm.pattern.exec(javaCode)) !== null) {
            diagnostics.push(createDiagnostic(match.index, match[0].length, sortingAlgorithm.message));
        }
    });
    return diagnostics;
}
// Search algorithms detection
function analyzeSearchAlgorithms(javaCode) {
    const diagnostics = [];
    const linearSearchPattern = /for\s*\(.*\w+\s*==.*\)\s*\{.*return.*\}/g;
    let match;
    while ((match = linearSearchPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Linear search detected. Consider using Binary Search for sorted arrays or more efficient search techniques."));
    }
    return diagnostics;
}
// Graph algorithms detection
function analyzeGraphAlgorithms(javaCode) {
    const diagnostics = [];
    const dfsPattern = /public\s+\w+\s+dfs\([^)]*\)\s*\{[^{}]*return\s+\w+\(.*dfs\(/g;
    const bfsPattern = /public\s+\w+\s+bfs\([^)]*\)\s*\{[^{}]*return\s+\w+\(.*bfs\(/g;
    let match;
    while ((match = dfsPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Recursive DFS detected. Consider using an iterative approach with a stack for large graphs to prevent stack overflow."));
    }
    while ((match = bfsPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Recursive BFS detected. Consider using an iterative approach with a queue for large graphs to prevent stack overflow."));
    }
    return diagnostics;
}
// String operations detection
function analyzeStringOperations(javaCode) {
    const diagnostics = [];
    const stringConcatPattern = /for\s*\(.*\w+\s*=.*\+.*;.*\)\s*\{(?:[^{}]*\w+\s*=\s*\w+\s*\+.*)+/g;
    const substringPattern = /\.substring\(/g;
    let match;
    while ((match = stringConcatPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Inefficient string concatenation detected. Use StringBuilder to improve performance in loops."));
    }
    while ((match = substringPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Frequent substring usage detected. Consider optimizing string manipulation."));
    }
    return diagnostics;
}
// Trie operations detection
function analyzeTrieOperations(javaCode) {
    const diagnostics = [];
    const triePattern = /TrieNode\s*\w+\s*=\s*new\s*TrieNode\(\);\s*\w+\.children/g;
    let match;
    while ((match = triePattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Inefficient Trie structure detected. Ensure Trie operations are optimized for prefix searches."));
    }
    return diagnostics;
}
//# sourceMappingURL=javaModel.js.map