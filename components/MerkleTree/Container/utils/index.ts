const Hashes = require('jshashes')

const SHA1 = new Hashes.SHA1();

export interface TreeNode {
    name: string;
    children?: TreeNode[];
}

interface LeafObject { 
    name:string
}

export const generateTree = (leaves: string[]):TreeNode => { 
    const leafObjects = getLeafObjects(leaves);
    const tree = constructTreeFromLeaves(leafObjects);
    return tree;
}   

const getLeafObjects = (leaves: string[]):LeafObject[] => { 
    return leaves.map((leaf:string) => {
        return {
            name: leaf,
        }
     })
}

let maxDepth:number;

const constructTreeFromLeaves = (nodes: LeafObject[]):TreeNode => { 
    maxDepth = Math.ceil(Math.log2(nodes.length))
    for (let currentDepth = maxDepth; currentDepth >= 0; currentDepth--) { 
        nodes = constructParentArray(nodes, currentDepth)
    }
    return nodes[0]
}

const constructParentArray = (leaves: LeafObject[], currentDepth:number):TreeNode[] => { 
    let newLeaves = []
    for (let leafNo = 0; leafNo < leaves.length; leafNo+=2) {
        let parent = constructPairAndGetParent(leaves, leafNo, currentDepth)
        newLeaves.push(parent)
    }
    return newLeaves
}   

const constructPairAndGetParent = (
    leaves: LeafObject[],
    leafNo: number,
    currentDepth: number
): TreeNode => { 
    const pair = [...leaves.slice(leafNo, leafNo + 2)]
    let parent:TreeNode;
    if (pair.length === 2) {
        if(currentDepth === maxDepth) {
            convertToLeafNode(pair[0])
            convertToLeafNode(pair[1])
        }
        parent = {
            name: getHash(pair[0].name + pair[1].name),
            children: pair
        }
    } else { 
        if(currentDepth === maxDepth) {
            convertToLeafNode(pair[0])
        }
        parent = pair[0]
    }
    return parent
}

const convertToLeafNode = (pair:TreeNode) => { 
    pair.children = [{ name: pair.name }]
    pair.name = getHash(pair.name)
}

const getHash = (str:string) => { 
    return SHA1.b64(str)
}