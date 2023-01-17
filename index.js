const {compiler} = require('./compiler/compiler');

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ TRUE negatives ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 1. throw new TypeError(`Tokenizer: Unknown char: '${char}'`);
// const inputCode  = 'addx(22, 2))'

// 2. Error(`Tokenizer: amtParenOpen!=amtParenClosed`)
// const inputCode  = 'add(22, 2))'

// 3. Error(`Tokenizer: amtParenOpen<amtParenClosed b4 end.`)
// const inputCode  = 'add(2,) 2))'

// 4. Error(`Parser: Characters not allowed after initialization'`)
// const inputCode = "add(1,2)1"
// const inputCode = "add(1,2)1"
// const inputCode  = 'add(2,2)add(2, 2)'
// const inputCode  = 'add(2,2)2'

// 5. Error(`Parser: Function must be declared before: '${tkn.type}'`)
// const inputCode  = '1 add(22, 2)'
// const inputCode  = '(add(2, 2))'

// 6. SyntaxError('Validate AST: Each function must have 2x params')
// const inputCode  = 'add(1, 2, 3)' //validate err
// const inputCode  = 'add(1, add(3))' //validate err
// const inputCode  = 'add(1, add(22, add(4, add(5, 6, 7))))'
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ TRUE negatives ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ TRUE positives ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// const inputCode  = 'add(2, 2)'
// const inputCode  = 'add(add(add(2, 2), 2), 2)'
// const inputCode  = 'add(1, add(22, 2))'
// const inputCode  = 'add(1, add(22, add(4, add(5, 6))))'
const inputCode  = 'add(add(add(2, 2), add(2 2)), 2)'
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ TRUE positives ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// (false negatives&positives not excluded)

const [inputTkns, inputAST, opcodes, bytecode] = compiler(inputCode)

console.log('\n0. inputCode:', inputCode)
console.log('\n1. inputTkns:', JSON.stringify(inputTkns, null, 2))
console.log('\n2. inputAST:',  JSON.stringify(inputAST, null, 2))
console.log('\n3. opcodes:',   JSON.stringify(opcodes, null, 2))
console.log('\n4. bytecode:',  JSON.stringify(bytecode, null, 2))