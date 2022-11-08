class Node 
{
    constructor(data)
    {
        this.data = data;
        this.previous = null;
        this.next = null;
    }
}

class LinkedList 
{
    constructor()
    {
        this.head = null;
        this.tail = null;
    }
    append = (data)=>{
        var newNode = new Node(data);
        if(this.head == null)
        {
            this.head = newNode;
            this.tail = newNode;
        } 
        else 
        {
            let traverse = this.head;
            while(traverse.next)
            {
                traverse = traverse.next;
            }
            traverse.next = newNode;
        }
    }

    addAtFirst = (data) => {
        let newNode = new Node(data);
        if(this.head == null)
        {
            this.head = newNode;
        }
        else 
        {
            newNode.next = this.head;
            this.head = newNode
        }
    }

    print = () => {
        let traverse = this.head;
        while(traverse)
        {
            console.log(traverse.data);
            traverse = traverse.next;
        } 
    }
}

var list = new LinkedList();
list.append(1);
list.append(2);
list.addAtFirst(10);
list.print();