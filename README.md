## <p align="center"> The mini-compiler that converts the JS-like 'add' function to EVM runtime bytecode. </p>

### Compiler Phases:
```
 1. Lexical analysis: Convert characters to tokens/lexemes (according to lang. grammar).
 2. Syntactic Analysis: Generate Abstract Syntax Tree (AST) //Parsing.
 3. Semantic Analysis: Validate structure & components relationships.
 4. Code Generation: Convert AST to Opcodes & EVM bytecode. (Transformation)
```

#### Run:
```
node index
```
#### Example output:
```javascript
0. inputCode: add(add(add(2, 2), add(2 2)),2)

1. inputTkns: [
  {
    "type": "word",
    "value": "add"
  },
  {
    "type": "paren",
    "value": "("
  },
  {
    "type": "word",
    "value": "add"
  },
  {
    "type": "paren",
    "value": "("
  },
  {
    "type": "word",
    "value": "add"
  },
  {
    "type": "paren",
    "value": "("
  },
  {
    "type": "number",
    "value": "2"
  },
  {
    "type": "number",
    "value": "2"
  },
  {
    "type": "paren",
    "value": ")"
  },
  {
    "type": "word",
    "value": "add"
  },
  {
    "type": "paren",
    "value": "("
  },
  {
    "type": "number",
    "value": "2"
  },
  {
    "type": "number",
    "value": "2"
  },
  {
    "type": "paren",
    "value": ")"
  },
  {
    "type": "paren",
    "value": ")"
  },
  {
    "type": "number",
    "value": "2"
  },
  {
    "type": "paren",
    "value": ")"
  }
]

2. inputAST: {
  "type": "ROOT",
  "body": [
    {
      "type": "Function",
      "name": "ADD",
      "params": [
        {
          "type": "Function",
          "name": "ADD",
          "params": [
            {
              "type": "Function",
              "name": "ADD",
              "params": [
                {
                  "type": "Number",
                  "value": "2"
                },
                {
                  "type": "Number",
                  "value": "2"
                }
              ]
            },
            {
              "type": "Function",
              "name": "ADD",
              "params": [
                {
                  "type": "Number",
                  "value": "2"
                },
                {
                  "type": "Number",
                  "value": "2"
                }
              ]
            }
          ]
        },
        {
          "type": "Number",
          "value": "2"
        }
      ]
    }
  ]
}

3. opcodes: [
  "PUSH1 0x02",
  "PUSH1 0x02",
  "ADD",
  "PUSH1 0x02",
  "PUSH1 0x02",
  "ADD",
  "ADD",
  "PUSH1 0x02",
  "ADD",
  "PUSH1 0x00",
  "MSTORE",
  "PUSH1 0x20",
  "PUSH1 0x00",
  "RETURN"
]

4. bytecode: "600260020160026002010160020160005260206000F3"
```
