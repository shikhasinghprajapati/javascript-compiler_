// IntermediateCodeGeneration.js
// Converts AST into a simplified Three-Address Code (TAC) style intermediate code.

// Input AST from SemanticAnalysis.js (embedded)
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


// Intermediate code generator class
class ICG {
  constructor() {
    this.tempCount = 0;
    this.labelCount = 0;
    this.code = [];
  }

  newTemp() {
    return `t${this.tempCount++}`;
  }

  newLabel() {
    return `L${this.labelCount++}`;
  }

  generate(node) {
    switch (node.type) {
      case 'Program':
        node.body.forEach(stmt => this.generate(stmt));
        break;
      case 'VariableDeclaration': {
        const right = this.generate(node.init);
        this.code.push(`${node.id.name} = ${right}`);
        break;
      }
      case 'AssignmentExpression': {
        const right = this.generate(node.right);
        this.code.push(`${node.left.name} = ${right}`);
        break;
      }
      case 'BinaryExpression': {
        const left = this.generate(node.left);
        const right = this.generate(node.right);
        const temp = this.newTemp();
        this.code.push(`${temp} = ${left} ${node.operator} ${right}`);
        return temp;
      }
      case 'Literal':
        return node.value.toString();
      case 'Identifier':
        return node.name;
      case 'IfStatement': {
        const testTemp = this.generate(node.test);
        const elseLabel = this.newLabel();
        const endLabel = this.newLabel();

        this.code.push(`ifFalse ${testTemp} goto ${elseLabel}`);
        this.generate(node.consequent);
        this.code.push(`goto ${endLabel}`);
        this.code.push(`${elseLabel}:`);
        if (node.alternate) {
          this.generate(node.alternate);
        }
        this.code.push(`${endLabel}:`);
        break;
      }
      case 'BlockStatement':
        node.body.forEach(stmt => this.generate(stmt));
        break;
      case 'WhileStatement': {
        const startLabel = this.newLabel();
        const endLabel = this.newLabel();
        this.code.push(`${startLabel}:`);
        const testTemp = this.generate(node.test);
        this.code.push(`ifFalse ${testTemp} goto ${endLabel}`);
        this.generate(node.body);
        this.code.push(`goto ${startLabel}`);
        this.code.push(`${endLabel}:`);
        break;
      }
      default:
        throw new Error(`ICG: Unknown node type ${node.type}`);
    }
  }
}

// Generate intermediate code
const icg = new ICG();
icg.generate(ast);

console.log('Intermediate Code Generation Output:');
console.log(icg.code.join('\n'));

/* Example output:
x = 5
t0 = x > 3
ifFalse t0 goto L0
x = t1 = x + 1
goto L1
L0:
x = t2 = x - 1
L1:
L2:
t3 = x < 10
ifFalse t3 goto L3
x = t4 = x + 2
goto L2
L3:
*/

// Run command: node IntermediateCodeGeneration.js
