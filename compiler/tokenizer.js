exports.tokenizer = input => {
  const grammar = {
    LETTERS: /[ad]/i,
    BREAK: /[\s, \,]/,
    NUMBERS: /\d/
  }

  const tkns = []
  let current = 0
  let amtParenOpen = 0
  let amtParenClosed = 0


  while (current<input.length){ //analyze each char
    if(amtParenOpen<amtParenClosed) throw new Error(`Tokenizer: amtParenOpen<amtParenClosed b4 end.`)
    let char = input[current]

    switch(true){
      case char == '(':
        tkns.push({type: 'paren', value: char});
        amtParenOpen++; current++
        continue
      case char == ')':
        tkns.push({type: 'paren', value: char});
        amtParenClosed++; current++
        continue
      case grammar.BREAK.test(char): //skip
        current++
        continue
      case grammar.LETTERS.test(char): //same as word but for number
        let _word = ''
        while (grammar.LETTERS.test(char)) {
          _word+=char
          char = input[++current]
        }
        tkns.push({type: 'word', value: _word})
        continue;
      case grammar.NUMBERS.test(char): //same as word but for number
        let _num = ''
        while (grammar.NUMBERS.test(char)) {
          _num+=char
          char = input[++current]
        }
        tkns.push({type: 'number', value: _num})
        continue;
    }

    throw new TypeError(`Tokenizer: Unknown char: '${char}'`);
  }

  if(amtParenOpen!=amtParenClosed) throw new Error(`Tokenizer: amtParenOpen!=amtParenClosed`)
  return tkns
}