exports.parser = input => {
  let current = 0

  function walk(parent) {
    let tkn = input[current]

    switch(true) {
      case tkn.type != 'word' && parent=='root':
        throw new Error(`Parser: Function must be declared before: '${tkn.type}'`)
      case tkn.type == 'word' && tkn.value == 'add':
        const expressionRoot = {
          type: 'Function',
          name: "ADD",
          params: []
        }

        tkn = input[current+=2] //skip "(", goto params

        while (tkn.value!==')') {
          expressionRoot.params.push(walk('node'))
          tkn = input[current]
        }
        current++
        if (parent=='root' && input[current]) throw new Error(`Parser: Characters now allowed after initialization'`)
        return expressionRoot
      case tkn.type == 'number':
        current++
        return {type: 'Number', value: tkn.value};
    }

    throw new TypeError(`Unknown token: '${tkn.type}'`)
  }

  const ast = {
    type: 'ROOT', //root
    body: [walk('root')] //start building AST (1 body's element = 1 line of code)
  };

  return ast
}