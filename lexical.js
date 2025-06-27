function lexicalAnalysis(source) {
  try {
    const tokens = esprima.tokenize(source, { loc: true });
    return tokens.map(t => `${t.type.padEnd(15)} : ${t.value}`).join('\n');
  } catch (e) {
    return 'Lexical Error: ' + e.message;
  }
}
