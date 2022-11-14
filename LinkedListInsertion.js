class Node{
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList{
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAtFirst(data) {
        this.head = new Node(data, this.head);
        this.size++;
        return data;
    }

    insertAtLast(data) {
        let node = new Node(data);
        let cur;
        if(!this.head) {
            this.head = node;
        }
        else {
            cur = this.head;
            while(cur.next) {
                cur = cur.next;
            }
            cur.next = node;
        }
        this.size++;
        return data;
    }

    insertAt(data, index) {
        if(index > 0 && index > this.size) {
            return;
        }
        if(index === "0") {
            this.head = new Node(data, this.head);
            this.size++;
            return;
        }
        const node = new Node(data);
        let cur, pre;
        cur = this.head;
        let count = 0;
        while(count < index) {
            pre = cur;
            count++;
            cur = cur.next;
        }
        node.next = cur;
        pre.next = node;
        this.size++;
        return data;
    }

    printList() {
        var array = new Array();
        let cur = this.head;
        let index = 0;
        while(cur) {
            array[index] = cur.data;
            cur = cur.next;
            index++;
        }
        return array;
    }

    clearList() {
        this.head = null;
        this.size = 0;
    }
}

const ll = new LinkedList();
const bodyParser = require('body-parser');
var { response } = require('express');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
    res.send(
    `<h3>Insert At First</h3>
    <form action="/insertAtFirst" method="post">
        Value: <input type="text" name="data"><br><br>
        <input type="submit" value="Insert"><br><br>
        <a href = "/atLast">Insert At Last</a><br><br>
        <a href = "/atIndex">Insert At Index</a><br><br>
        <a href = "/showList">Show List</a><br>
    </form>`)
});

app.get("/atLast", function(req,res) {
    res.send(
        `<h3>Insert At Last</h3>
        <form action="/insertAtLast" method="post">
            Value: <input type="text" name="data"><br><br>
            <input type="submit" value="Insert"><br><br>
            <a href = "/">Insert At First</a><br><br>
            <a href = "/atIndex">Insert At Index</a><br><br>
            <a href = "/showList">Show List</a><br>
        </form>`)
});

app.get("/atIndex", function(req,res) {
    res.send(
        `<h3>Insert At Index</h3>
        <form action="/insertAtIndex" method="post">
            Value: <input type="text" name="data"><br><br>
            Index: <input type="text" name="index"><br><br>
            <input type="submit" value="Insert"><br><br>
            <a href = "/">Insert At First</a><br><br>
            <a href = "/atLast">Insert At Last</a><br><br>
            <a href = "/showList">Show List</a><br>
        </form>`)
});

app.get("/showList", function(req,res) {
    res.send(JSON.stringify(Object.assign({}, ll.printList())));
});

app.post("/insertAtFirst", function(req, res){
    res.send(JSON.stringify(ll.insertAtFirst(req.body.data))+" inserted at first in the list.");
});

app.post("/insertAtLast", function(req, res){
    res.send(JSON.stringify(ll.insertAtLast(req.body.data))+" inserted at last in the list.");
});

app.post("/insertAtIndex", function(req, res){
    response = {value:req.body.data, pos:req.body.index};
    res.send(JSON.stringify(ll.insertAt(response['value'], response['pos']))+" inserted at index "+response['pos']+" in the list.");
});

app.listen(2000, function (err) {
    if(err) {
        console.log(err)
    }
    console.log("Server started at port 2000..."); 
})
