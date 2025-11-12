export default class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    //Creating a new node - helping method
    createNode(data, next = null) { 
        return { data, next};
    }

    printQueue() {
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
        if (this.length == 0) {
            console.log("(This queue is empty)");
        }
    }

    //Similar to add (data) from singlylinkedlist - except we put it as the tail as well
    enqueue( data ) {
        //Create new node at the end, with data from the argument
        const newNode = this.createNode(data);
        //Checking if the queue has a head - or it will be set as the head
        if( !this.head ) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            //Linking the new tail with the code
            this.tail.next = newNode;
            this.tail = newNode;
        } 
        this.length++;
    }

    dequeue() {
        const removedNode = this.head.data;

        //Overrides this head to be the next node.
        this.head = this.head.next;
        this.length--;
        //returns removed node
        return removedNode; 
    }

    peek() {
        //Checking if there is a head
        return this.head ? this.head.data : null;
    }

    get( index ) {
        let current = this.head;
        let i = 0;
        while(i<index){
            current.next;
            i++;
        }
        return current.data;
    }

    size() {
        return this.length;
    }

    clear() {
        this.head = null; 
    }

    getNode( index ) {
        //Checks if index is valid (inside of the bounds)
        if(index < 0 || index >= this.length) {
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
    
    getLastNode() {
        return this.tail;
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

}

    const q = new Queue();

    q.enqueue("A");
    q.enqueue("B");
    q.enqueue("C");

    console.log(q.peek());
    console.log(q.size());
    console.log(q.get(1));
    console.log(q.dequeue());
    console.log(q.peek());
    console.log(q.size());
