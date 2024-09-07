# Java Code Optimizer

## Description
The Java Code Optimizer VS Code extension helps you identify and optimize inefficient code patterns in Java. It analyzes your code for common Data Structures and Algorithms (DSA) inefficiencies and provides suggestions for improvements.

## Features
- Detects inefficient sorting algorithms (Bubble Sort, Selection Sort, Insertion Sort).
- Identifies inefficient search algorithms and suggests Binary Search.
- Analyzes graph algorithms for recursive inefficiencies and suggests iterative solutions.
- Highlights inefficient string operations and suggests using `StringBuilder`.
- Detects inefficient Trie structures and suggests optimizations.

## Usage
1. Install the extension from the VS Code marketplace.
2. Open a Java file in the editor.
3. Use the command `Java Code Optimizer: Optimize Java Code` from the command palette or toolbar.
4. View suggestions and optimizations directly in the editor and the output channel.

## Development
To contribute to the development of this extension, clone the repository and run:

```bash
npm install
npm run vscode:prepublish
