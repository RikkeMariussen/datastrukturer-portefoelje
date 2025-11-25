export default class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    //Creating a new node - helping method - _ = private og skal ikke bruges udenfor denne klasse
    _createNode(data, next = null) { 
        return { data, next};
    }

    printList() {
        //Start at: head - the first node
        let current = this.head;
        let index = 0;
        
        //if there is a node at the head, it will run a while loop
        while(current) {
             console.log(`[${index}] data: ${JSON.stringify(current.data)}, next: ${current.next ? "→" : "null"}`);
            // moves to next node, exits if it's null
            current = current.next;
            index++;
        }
        // If the list is empty:
        if (this.size == 0) {
            console.log("(This list is empty)");
        }
    }

    add( data ) {
        // Create new node with data from the argument
        const newNode = this._createNode(data);
        // if the list doesn't have a head, this sets the new node as the head
        if( !this.head ) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        } 
        this.size++;
    }

    get( index ) {
        let node = this.getNode(index);
        //Checking if null
        if ( node != null) {
            return node.data;
        } else {
            //Its null
            return undefined;
        }
    }

    getFirst() {
        //Checking if there is a head
        return this.head ? this.head.data : null;
    }

    getLast() {
        let lastNode = this.getLastNode();
        return this.lastNode ? lastNode.data : null;
    }

    set( index, data ) {
        let node = this.getNode(index);
        //Is there anything on that index?
        if (!node) {
            throw RangeError(`Index ${index} is out of bounds`);
        }
        //Changes the data on the node of the index with the data from the argument
        node.data = data;

    }

    insert( index, data ) {
        //Checking if index from argument is valid
        if( index < 0 || index > this.size ) {
            throw RangeError(`Index ${index} is out of bounds`);
        } 

        //Creating the node from the data from the argument --> Using the helping method from earlier in the code
        let newNode = this._createNode(data);

        //Seeing if the index is 0 (head) and making it the head
        if (index == 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            // Looking for the node before the placement we want
            let previousNode = this.getNode(index-1);
            newNode.next = previousNode.next;
            //Making the node after the previous node to the new node
            previousNode.next = newNode;
        }
        this.size++;

    }

    remove( index ) {
        if (index < 0 || index >= this.size) {
            throw new RangeError(`Index: ${index} is outside of the range`);
        }
        let removedNode;

        //Check if it is the head or just a node
        if (index == 0) {
            removedNode = this.head;
            //Overrides this head to be the next node.
            this.head = this.head.next;
        } else {
            // Looking for the node before the node we want to remove
            let previousNode = this.getNode(index-1);
            removedNode.next = previousNode.next;
            //Making the next node after the one we want to remove, the previous nodes next node
            previousNode.next = removedNode.next;
        }

        this.size--;

        //remove node
        return removedNode.data; 
    }

    removeFirst() {
        let current = node.getFirst();
        node.remove(current.index);
        return current;
    }

    removeLast() {
        let current = node.getLast();
        node.remove(current.index);
        return current;
    }

    size() {
        let count = 0;
        //We start at the head
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    clear() {
        this.head = null; 
    }

    getNode( index ) {
        //Checks if index is valid (inside of the bounds)
        if(index < 0 || index >= this.size) {
            return null;
        }

        let current = this.head;
        let i = 0;

        //Looking through all the nodes, until it finds the one where the index matches
        while (current && i < index) {
            current = current.next;
            i++;
        }
        return current;
    }

    getFirstNode() {
        return this.head;
    }
    
    getLastNode() {
        return this.getNode(size-1);
    }

    getNextNode( node ) {
        //Returns next node or null, if there is a node.next, it returns that, otherwise it returns null
        return node ? node.next : null;
    }

    getPreviousNode( node ) {
        //Checking if there is a head or if the node from arugment is the head
        if (!this.head || this.head == node) {return null}
        //We start at the head
        let current = this.head;
        //looping through the nodes, until it finds the node where .next points to the node we are looking for
        while(current && current.next != node) {
            current = current.next;
        }
        return current;
    }

    insertBefore(targetNode, data) {
        // early return if there is no node to insert
        if (!targetNode) return;

        // creates new node with data from argument
        let newNode = this._createNode(data);

        // if the target is the head
        if (targetNode == this.head) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let previousNode = this.getPreviousNode(targetNode);
            if (!previousNode) {return;}
            newNode.next = targetNode;
            // sets prev node's next as the new node
            previousNode.next = newNode;
        }

        this.size++;
    }

    insertAfter(targetNode, data) {
        // if there is no node to insert
        if (!targetNode) {return;}

        // Creating a new node from argument and sets the next node as the target node's next
        let newNode = this._createNode(data, targetNode.next);
        targetNode.next = newNode;
        this.size++;
    }

    removeNode(targetNode) {
        // if there is no node to remove
        if (!targetNode || !this.head) {return null;}
        //Checking if the target node is the head
        if (targetNode == this.head) {
            this.head = this.head.next;
        } else {
        const previousNode = this.getPreviousNode(targetNode);
        // return if there is no previous node
        if (!previousNode) {return null;}
        // Setting the previous node's next to the target node's next
        previousNode.next = targetNode.next;
        }

        this.size--;
        return targetNode.data;
    }

}