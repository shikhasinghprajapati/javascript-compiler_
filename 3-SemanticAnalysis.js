// SemanticAnalysis.js
// Performs semantic analysis on the AST to check for variable declarations
// and other semantic errors.

// Input AST from SyntaxAnalysis.js (embedded here for demo)
const ast = {
  type: 'Program',
  body: [
    { type: 'VariableDeclaration', id: { type: 'Identifier', name: 'x' }, init: { type: 'Literal', value: 5 } },
    {
      type: 'IfStatement',
      test: {
        type: 'BinaryExpression',
        operator: '>',
        left: { type: 'Identifier', name: 'x' },
        right: { type: 'Literal', value: 3 }
      },
      consequent: {
        type: 'BlockStatement',
        body: [
          {
            type: 'AssignmentExpression',
            left: { type: 'Identifier', name: 'x' },
            right: {
              type: 'BinaryExpression',
              operator: '+',
              left: { type: 'Identifier', name: 'x' },
              right: { type: 'Literal', value: 1 }
            }
          }
        ]
      },
      alternate: {
        type: 'BlockStatement',
        body: [
          {
            type: 'AssignmentExpression',
            left: { type: 'Identifier', name: 'x' },
            right: {
              type: 'BinaryExpression',
              operator: '-',
              left: { type: 'Identifier', name: 'x' },
              right: { type: 'Literal', value: 1 }
            }
          }
        ]
      }
    },
    {
      type: 'WhileStatement',
      test: {
        type: 'BinaryExpression',
        operator: '<',
        left: { type: 'Identifier', name: 'x' },
        right: { type: 'Literal', value: 10 }
      },
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'AssignmentExpression',
            left: { type: 'Identifier', name: 'x' },
            right: {
              type: 'BinaryExpression',
              operator: '+',
              left: { type: 'Identifier', name: 'x' },
              right: { type: 'Literal', value: 2 }
            }
          }
        ]
      }
    }
  ]
};

// Semantic analyzer class
class SemanticAnalyzer {
  constructor() {
    this.symbolTable = new Set(); // to track declared variables
    this.errors = [];
  }

  analyze(node) {
    switch (node.type) {
      case 'Program':
        node.body.forEach(stmt => this.analyze(stmt));
        break;
      case 'VariableDeclaration':
        if (this.symbolTable.has(node.id.name)) {
          this.errors.push(`Variable ${node.id.name} already declared.`);
        } else {
          this.symbolTable.add(node.id.name);
        }
        this.analyze(node.init);
        break;
      case 'AssignmentExpression':
        if (!this.symbolTable.has(node.left.name)) {
          this.errors.push(`Variable ${node.left.name} not declared before assignment.`);
        }
        this.analyze(node.right);
        break;
      case 'BinaryExpression':
        this.analyze(node.left);
        this.analyze(node.right);
        break;
      case 'IfStatement':
        this.analyze(node.test);
        this.analyze(node.consequent);
        if (node.alternate) this.analyze(node.alternate);
        break;
      case 'WhileStatement':
        this.analyze(node.test);
        this.analyze(node.body);
        break;
      case 'BlockStatement':
        node.body.forEach(stmt => this.analyze(stmt));
        break;
      case 'Identifier':
        if (!this.symbolTable.has(node.name)) {
          this.errors.push(`Variable ${node.name} used before declaration.`);
        }
        break;
      case 'Literal':
        // literals are always valid
        break;
      default:
        this.errors.push(`Unknown node type: ${node.type}`);
    }
  }
}

// Run semantic analysis
const semanticAnalyzer = new SemanticAnalyzer();
semanticAnalyzer.analyze(ast);

console.log('Semantic Analysis:');
if (semanticAnalyzer.errors.length === 0) {
  console.log('No semantic errors found. Symbol Table:', Array.from(semanticAnalyzer.symbolTable));
} else {
  console.log('Semantic errors:');
  semanticAnalyzer.errors.forEach(e => console.log('  -', e));
}

// Run command: node SemanticAnalysis.js
