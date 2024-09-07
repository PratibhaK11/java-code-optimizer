import * as vscode from 'vscode';

// Create diagnostic messages
function createDiagnostic(startIndex: number, length: number, message: string): vscode.Diagnostic {
    const editor = vscode.window.activeTextEditor;
    const startPos = editor?.document.positionAt(startIndex);
    const endPos = editor?.document.positionAt(startIndex + length);
    const range = new vscode.Range(startPos!, endPos!);

    return new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
}

// Analyze Java code for common DSA inefficiencies
export function analyzeDSA(javaCode: string): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];

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
function analyzeSortingAlgorithms(javaCode: string): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];
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
        let match: RegExpExecArray | null;
        while ((match = sortingAlgorithm.pattern.exec(javaCode)) !== null) {
            diagnostics.push(createDiagnostic(match.index, match[0].length, sortingAlgorithm.message));
        }
    });

    return diagnostics;
}

// Search algorithms detection
function analyzeSearchAlgorithms(javaCode: string): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];
    const linearSearchPattern = /for\s*\(.*\w+\s*==.*\)\s*\{.*return.*\}/g;

    let match: RegExpExecArray | null;
    while ((match = linearSearchPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Linear search detected. Consider using Binary Search for sorted arrays or more efficient search techniques."));
    }

    return diagnostics;
}

// Graph algorithms detection
function analyzeGraphAlgorithms(javaCode: string): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];
    const dfsPattern = /public\s+\w+\s+dfs\([^)]*\)\s*\{[^{}]*return\s+\w+\(.*dfs\(/g;
    const bfsPattern = /public\s+\w+\s+bfs\([^)]*\)\s*\{[^{}]*return\s+\w+\(.*bfs\(/g;

    let match: RegExpExecArray | null;
    while ((match = dfsPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Recursive DFS detected. Consider using an iterative approach with a stack for large graphs to prevent stack overflow."));
    }

    while ((match = bfsPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Recursive BFS detected. Consider using an iterative approach with a queue for large graphs to prevent stack overflow."));
    }

    return diagnostics;
}

// String operations detection
function analyzeStringOperations(javaCode: string): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];
    const stringConcatPattern = /for\s*\(.*\w+\s*=.*\+.*;.*\)\s*\{(?:[^{}]*\w+\s*=\s*\w+\s*\+.*)+/g;
    const substringPattern = /\.substring\(/g;

    let match: RegExpExecArray | null;
    while ((match = stringConcatPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Inefficient string concatenation detected. Use StringBuilder to improve performance in loops."));
    }

    while ((match = substringPattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Frequent substring usage detected. Consider optimizing string manipulation."));
    }

    return diagnostics;
}

// Trie operations detection
function analyzeTrieOperations(javaCode: string): vscode.Diagnostic[] {
    const diagnostics: vscode.Diagnostic[] = [];
    const triePattern = /TrieNode\s*\w+\s*=\s*new\s*TrieNode\(\);\s*\w+\.children/g;

    let match: RegExpExecArray | null;
    while ((match = triePattern.exec(javaCode)) !== null) {
        diagnostics.push(createDiagnostic(match.index, match[0].length, "Inefficient Trie structure detected. Ensure Trie operations are optimized for prefix searches."));
    }

    return diagnostics;
}
