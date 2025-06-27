// CodeOptimization.js
// Simple code optimizer: Performs constant folding in intermediate code.

// Input intermediate code from IntermediateCodeGeneration.js (embedded)
const code = [
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

// Very simple constant folder for expressions of form tN = n OP m where n,m are numeric literals
function constantFold(codeLines) {
  const newCode = [];
  const constants = {}; // keep track of temporaries known to be constant

  for (let line of codeLines) {
    // Match lines like t0 = 5 + 3
    let assignMatch = line.match(/^(t\d+) = (\w+) ([+\-*\/><=]+) (\w+)$/);
    if (assignMatch) {
      const temp = assignMatch[1];
      const left = assignMatch[2];
      const op = assignMatch[3];
      const right = assignMatch[4];

      const leftVal = constants[left] !== undefined ? constants[left] : (isNaN(left) ? null : Number(left));
      const rightVal = constants[right] !== undefined ? constants[right] : (isNaN(right) ? null : Number(right));

      if (leftVal !== null && rightVal !== null) {
        // fold constant
        let result;
        switch (op) {
          case '+': result = leftVal + rightVal; break;
          case '-': result = leftVal - rightVal; break;
          case '*': result = leftVal * rightVal; break;
          case '/': result = leftVal / rightVal; break;
          case '>': result = leftVal > rightVal; break;
          case '<': result = leftVal < rightVal; break;
          case '==': result = leftVal == rightVal; break;
          case '>=': result = leftVal >= rightVal; break;
          case '<=': result = leftVal <= rightVal; break;
          case '!=': result = leftVal != rightVal; break;
          default:
            result = null;
        }
        if (result !== null) {
          constants[temp] = result;
          // Replace line with direct assignment of constant
          newCode.push(`${temp} = ${result}`);
          continue;
        }
      }
      // otherwise keep original line
      newCode.push(line);
      continue;
    }

    // Propagate constants for direct assignments like x = 5 or t0 = 5
    let directAssign = line.match(/^(\w+) = (\d+)$/);
    if (directAssign) {
      const target = directAssign[1];
      const val = Number(directAssign[2]);
      constants[target] = val;
      newCode.push(line);
      continue;
    }

    // Otherwise keep line as is
    newCode.push(line);
  }

  return newCode;
}

const optimizedCode = constantFold(code);

console.log('Code after Optimization (Constant Folding):');
console.log(optimizedCode.join('\n'));

// Run command: node CodeOptimization.js
