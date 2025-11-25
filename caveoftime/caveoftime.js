// node caveoftime.js --> .load caveoftime.js

const root = {
    page: 2,
    title: "Asleep in the cave",
    parent: null,
    children: []
}

const page4 = {
    page: 4,
    title: "awake",
    parent: root,
    children: []
}

const page5 = {
    page: 5,
    title: "cold wind",
    parent: root,
    children: []
}

const page6 = {
    page: 6,
    title: "medieval ages",
    parent: null,
    children: []
}

const page8 = {
    page: 8,
    title: "ice age",
    parent: null,
    children: []
}

const page10 = {
    page: 10,
    title: "cave",
    parent: null,
    children: []
}

const page17 = {
    page: 17,
    title: "cavemen",
    parent: null,
    children: []
}

const page18 = {
    page: 18,
    title: "mammoth",
    parent: null,
    children: []
}

const page20 = {
    page: 20,
    title: "desert",
    parent: null,
    children: []
}

const page28 = {
    page: 28,
    title: "cave",
    parent: null,
    children: []
}

function addChild( parentNode, childNode ){
    //Adds the childNode to the parentNodes list of children
    parentNode.children.push(childNode);
    //Makes the parentNode to be the parent of the childNode
    childNode.parent = parentNode;
}

function createNode( pageNo, titleNode ) {
    return {
        //Could also be: (if param was page and title): page, title, parent: null, childen: []
        page: pageNo,
        title: titleNode,
        parent: null,
        children: []
    }
}
const page51 = createNode(51, "return home (11 years later) (END)");

addChild(root, page4);
addChild(root, page5);
addChild(page5, page6);
addChild(root, page4);
addChild(page4, page8);
addChild(page4, page10);
addChild(page10, page20);
addChild(page8, page17);
addChild(page8, page18);
addChild(page17, page28);
addChild(page28, page51);

console.log(root);

function findPage( pageNumber ) {
    //we start at the beginning
    let node = root;
    if (node.page == pageNumber) {
        return node;
    } else {
        //We look at all the childrens of the page number we are looking at
        for(const child of node.children) {
            if(child.page == pageNumber) {
                return child;
            } else {

            }
        }
    }
}

function findPageR (pageNumber, node=root) {
    console.log("Looking at page: " + pageNumber)
    if ( node.page == pageNumber) {
        return node;
    } else {
        console.log("Looking at children of: " + node.page)
        for(const child of node.children) {
            node = findPageR(pageNumber, child);
        }
        return node;
    }
}

//Print the tree aka dump
function printTree ()

