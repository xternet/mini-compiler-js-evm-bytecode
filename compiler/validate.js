exports.validate = inputAST => {
	function traverse(node) {
		switch(true){
			case node.type == "Function" && node.params.length!=2:
				throw new SyntaxError('Validate AST: Each function must have 2x params')
			case node.type == "ROOT":
				traverseMulti(node.body, node)
				break
			case node.type == "Function":
				traverseMulti(node.params, node)
				break
			case node.type == "Number":
				break
		}

		function traverseMulti(nodes){
			nodes.forEach(node => traverse(node))
		}
	}

	traverse(inputAST)
}