exports.generateOpcodes = inputAST => {
	const opcodes = []

	function traverse(node) {
		switch(true){
			case node.type == "ROOT":
				traverseMulti(node.body, node)
				break
			case node.type == "Function":
				traverseMulti(node.params, node)
				opcodes.push(node.name)
				break
			case node.type == "Number":
				num = Number(node.value)
				node.value.length==1 ? num = '0'+num.toString(16) : num = num.toString(16)
				opcodes.push("PUSH1 0x"+num)
				break
		}

		function traverseMulti(nodes){
			nodes.forEach(node => traverse(node))
		}
	}

	traverse(inputAST) //START HERE

	opcodes.push("PUSH1"+ ' 0x' + "00") //set offset
	opcodes.push("MSTORE")              //store result in memory
	opcodes.push("PUSH1"+ ' 0x' + "20") //set size
	opcodes.push("PUSH1"+ ' 0x' + "00") //set offset
	opcodes.push("RETURN")              //return
	return opcodes
}