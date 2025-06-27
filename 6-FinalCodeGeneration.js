// FinalCodeGeneration.js
// Generates final code from intermediate code - simulated as very simple assembly-like instructions.

// Input intermediate code (after optimization ideally)
const intermediateCode = [
  'x = 5',
  't0 = x > 3',
  'ifFalse t0 goto L0',
  't1 = x + 1',
  'x = t1',
  'goto L1',
  'L0:',
  't2 = x - 1',
  'x = t2',
  'L1:',
  'L2:',
  't3 = x < 10',
  'ifFalse t3 goto L3',
  't4 = x + 2',
  'x = t4',
  'goto L2',
  'L3:',
];

// Simple assembly-like code generator mapping
function generateAssembly(intermediateCode) {
  const assembly = [];

  for (let line of intermediateCode) {
    if (line.endsWith(':')) {
      // Label line
      assembly.push(`${line}`); // keep label as is
      continue;
    }

    // Parse assignment or control line
    let ifMatch = line.match(/^ifFalse (t\d+) goto (L\d+)$/);
    if (ifMatch) {
      const reg = ifMatch[1];
      const label = ifMatch[2];
      assembly.push(`CMP ${reg}, 0`);
      assembly.push(`JE ${label}`);
      continue;
    }

    let assignMatch = line.match(/^(\w+) = (.+)$/);
    if (assignMatch) {
      const left = assignMatch[1];
      const right = assignMatch[2];
      // If right is a binary expression stored in temp, we generate instructions accordingly:
      let binMatch = right.match(/(t\d+) ([+\-*\/><=]+) (t\d+|\w+|\d+)/);
      if (binMatch) {
        const op1 = binMatch[1];
        const op = binMatch[2];
        const op2 = binMatch[3];
        // Mov op1 to left register
        assembly.push(`MOV ${left}, ${op1}`);
        // Apply operation
        switch (op) {
          case '+': assembly.push(`ADD ${left}, ${op2}`); break;
          case '-': assembly.push(`SUB ${left}, ${op2}`); break;
          case '*': assembly.push(`MUL ${left}, ${op2}`); break;
          case '/': assembly.push(`DIV ${left}, ${op2}`); break;
          case '>':
          case '<':
          case '==':
          case '>=':
          case '<=':
          case '!=':
            assembly.push(`CMP ${op1}, ${op2}`);
            assembly.push(`; Operator ${op} - conditional jumps inserted earlier`);
            break;
          default:
            assembly.push(`; Unknown op: ${op}`);
        }
        continue;
      }
      // If right is simple number or variable
      assembly.push(`MOV ${left}, ${right}`);
      continue;
    }

    assembly.push(`; Unknown Line: ${line}`);
  }

  return assembly;
}

const assemblyCode = generateAssembly(intermediateCode);

console.log('Final Code Generation Output (Assembly-like):');
console.log(assemblyCode.join('\n'));

// Run command: node FinalCodeGeneration.js
