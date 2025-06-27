function parseSyntax(source) {
  try {
    const ast = esprima.parseScript(source, { loc: true, tolerant: true, range: true });
    return ast;
  } catch (e) {
    return 'Syntax Error: ' + e.message;
  }
}

function formatAST(ast) {
  try {
    return JSON.stringify(ast, null, 2);
  } catch {
    return '(AST JSON format error)';
  }
}
