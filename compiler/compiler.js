const {tokenizer}        = require('./tokenizer')
const {parser}           = require('./parser')
const {validate}         = require('./validate')
const {generateOpcodes}  = require('./generateOpcodes')
const {generateBytecode} = require('./generateBytecode')

exports.compiler = inputCode => {
	const inputTkns = tokenizer(inputCode)  //Lexical Analysis: convert chars into tokens/lexems
	const inputAST  = parser(inputTkns)     //Syntactic Analysis: generate Abstract Syntax Tree (AST)

	validate(inputAST)											//Semantic Analysis

	const opcodes   = generateOpcodes(inputAST)
	const bytecode  = generateBytecode(inputAST)

	return [inputTkns, inputAST, opcodes, bytecode]
}