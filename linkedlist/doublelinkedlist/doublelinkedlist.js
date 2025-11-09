export default class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    //Creating a new node - helping method - _ = private og skal ikke bruges udenfor denne klasse
    _createNode(data, next = null, prev = null) { 
        return { data, next, prev};
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

    addFirst( data ) {
        // Create new node with data from the argument
        const newNode = this._createNode(data);
        // if the list doesn't have a head (and tail), this sets the new node as the head
        if( !this.head && !this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            //In case there was a head, the newNode will be made to be the head.prev to take over the position of the head
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        } 
        this.size++;
    }

    addLast( data ) {
        // Create new node with data from the argument
        const newNode = this._createNode(data);
        // if the list doesn't have a tail (or a head), this sets the new node as the tail and the head
        if( !this.head && !this.tail) {
            //These sets the newNode as both the tail and the head of the list
            this.head = newNode;
            this.tail = newNode;
        } else {
            //These sets the tail of the lists next to be the new node, and then making the previous node of the newNode to the tail. And then makes the newNode the tail instead of the old tail 
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
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
            if(this.head){this.head.prev = newNode;}
            this.head = newNode;
            if(!this.tail){this.tail = newNode;}
        }else if(index == this.size){
            newNode.prev = this.tail;
            if(this.tail){this.tail.next = newNode;}
            this.tail = newNode;
        } else {
            // Looking for the nodes before and after where we want to place the node
            let previousNode = this.getNode(index-1);
            let nextNode = previousNode.next;

            //Place the node between those, and connect the nodes to eachother
            newNode.next = nextNode;
            newNode.prev = previousNode;
            previousNode.next = newNode;
            if(nextNode) {nextNode.prev = newNode;}
        }
        this.size++;

    }

    remove( index ) {
        //Checking if the index is valid
        if (index < 0 || index >= this.size) {
            throw new RangeError(`Index: ${index} is outside of the range`);
        }
        let removedNode;

        //Check if it is the head or just a node
        if (index == 0) {
            removedNode = this.head;
            //Overrides this head to be the next node.
            this.head = this.head.next;
            if(this.head) {this.head.prev = null;}
            if(this.size == 1) {this.tail = null;}
        } else if (index == tail.size -1) {
            //If the index is the last one, aka the tail, we need to set a new tail
            removedNode = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            // Looking for the node before and after the node we want to remove
            let previousNode = this.getNode(index-1);
            let nextNode = previousNode.next.next;

            removedNode = previousNode.next;
            //Making the next node after the one we want to remove, the previous nodes next node
            previousNode.next = removedNode.next;
            //Making the previous node after the one we want to remove, the next node's previous one
            nextNode.prev = previousNode;
        }

        this.size--;

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
        let j = this.size -1;

        //First we need to know whether it is quickest from head or tail.
        if(index > 0 && index < this.size/2){
        //As the index we are looking for is in the bottom half of the size, it is quicker from head
            current = this.head;
            while (current && i < index) {
                current = current.next;
                i++;
            }
        } else {
            current = this.tail;
            while(current && j > index) {
                current = current.prev;
                j--;
            }
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
        return node ? node.next : null;
    }

    getPreviousNode( node ) {
        return node ? node.prev : null;
    }

    insertBefore(node, data) {
        // Checking to see if there is a node to insert
        if (!node) return;

        // creates new node with data from argument
        let newNode = this._createNode(data);
        let previousNode = node.prev;

        newNode.next = node;
        newNode.prev = previousNode;
        node.prev = newNode;

        if (previousNode) {
            previousNode = newNode;
        } else {
            //if inserted before the head
            this.head = newNode;
        }

        this.size++;
    }

    insertAfter(node, data) {
        // Checking if there is a node to insert
        if (!node) {return;}

        // Creating a new node from argument and sets the next node as the target node's next
        let newNode = this._createNode(data);
        let nextNode = node.next;
        
        newNode.prev = node;
        newNode.next = nextNode;
        node.next = newNode;

        if (nextNode) {
            nextNode.prev = newNode;
        } else { this.tail = newNode; }
        this.size++;
    }

    removeNode(node) {
        // Checking if there is a node to remove
        if (!node || !this.head) {return null;}
        //Checking if the target node is the head
        if (node == this.head) {
            this.head = this.head.next;
            //Makes the new heads prev to null
            if(this.head) {this.head.prev = null;}
            if (this.size == 1) {this.tail = null;}
        } else if(node == this.tail) {
            this.tail = this.tail.prev;
            if(this.tail) {this.tail.next = null;}
        } else {
            const previousNode = this.getPreviousNode(node);
            const nextNode = previousNode.next.next;
            // return if there is no previous node
            if (!previousNode) {return null;}
            // Setting the previous node's next to the target node's next
            previousNode.next = node.next;
            nextNode.prev = previousNode;
        }

        this.size--;
        return node.data;
    }
}