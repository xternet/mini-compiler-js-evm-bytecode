exports.generateBytecode = inputAST => {
  let bytecode = ''

  const opcodes_table = {
    'ADD': '01',
    'MSTORE': '52',
    'PUSH1': '60',
    'RETURN': 'F3'
  }

  function traverse(node) {
    switch(true){
      case node.type == "ROOT":
        traverseMulti(node.body, node)
        break
      case node.type == "Function":
        traverseMulti(node.params, node)
        bytecode+=opcodes_table[node.name]
        break
      case node.type == "Number":
        num = Number(node.value)
        node.value.length==1 ? num = '0'+num.toString(16) : num = num.toString(16)
        bytecode+="60"+num
        break
    }

    function traverseMulti(nodes){
      nodes.forEach(node => traverse(node))
    }
  }

  traverse(inputAST) //START HERE

  bytecode+="60" + "00" //set offset
  bytecode+="52"        //add to memory
  bytecode+="60" + "20" //set size
  bytecode+="60" + "00" //set offset
  bytecode+="F3"        //return memory
  return bytecode
}