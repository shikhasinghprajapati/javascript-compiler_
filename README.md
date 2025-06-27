# JavaScript Compiler Demo

## Description
This project is a simple JavaScript compiler demo that allows users to input JavaScript code and see the output of various compilation phases, including lexical analysis, syntax analysis, semantic analysis, intermediate representation generation, optimization, and code generation. The project is designed to help users understand the inner workings of a JavaScript compiler and how code is processed through different stages.

## Features
- *Lexical Analysis*: Breaks down the input JavaScript code into tokens.
- *Syntax Analysis*: Constructs an Abstract Syntax Tree (AST) from the tokens.
- *Semantic Analysis*: Checks for semantic errors in the AST.
- *Intermediate Representation*: Generates a lower-level representation of the code.
- *Optimization*: Applies optimization techniques to improve performance.
- *Code Generation*: Translates the optimized intermediate representation into executable code.

## Getting Started

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox)
- Basic knowledge of JavaScript

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shikhasinghprajapati/javascript-compiler.git

   Usage
Open index.html in your web browser.
Enter your JavaScript code in the provided textarea.
Click the "Run" button to execute the compilation process.
View the output of each compilation phase in the respective sections.

File Descriptions
index.html: The main HTML file that serves as the user interface for the JavaScript compiler.
1-lexical.js: Implements the lexical analysis phase of the compiler.
2-syntax.js: Handles the syntax analysis phase, constructing an Abstract Syntax Tree (AST).
3-semantic.js: Performs semantic analysis on the AST, checking for semantic errors.
4-IntermediateCodeGeneration.js: Generates the intermediate representation (IR) of the code.
5-CodeOptimization.js: Implements optimization techniques on the intermediate representation.
6-FinalCodeGeneration.js: Translates the optimized intermediate representation into executable code.

Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.~~
