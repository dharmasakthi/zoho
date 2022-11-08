//To run ctrl + alt + n

#include<iostream>

using namespace std;

class Node 
{
    public:
    int data;
    Node* next;
    Node* previous;
};

void append(Node** head, Node** tail, int data)
{
    Node* newNode = new Node;
    newNode->data = data;
    newNode->next = NULL;
    newNode->previous = NULL;
    if((*head) == NULL)
    {
        (*head) = newNode;
        (*tail) = newNode;
        return;
    }
    Node* traverse = *head;
    while(traverse->next != NULL)
    {
        traverse = traverse->next;
    }
    traverse->next = newNode;
    newNode->previous = traverse;
    (*tail) = newNode;
    return;
}

void addAtFirst(Node** head, Node** tail, int data)
{
    Node* newNode = new Node;
    newNode->data = data;
    newNode->next = NULL;
    newNode->previous = NULL;

    if((*head) == NULL && (*tail) == NULL)
    {
        (*head) = newNode;
        (*tail) = newNode;
    }
    else if(*head)
    {
        (*head)->previous = newNode;
        newNode->next = (*head);
        (*head) = newNode;
    }

}

void print(Node* head, Node* tail)
{
    if(head == NULL)
    {
        cout << "Empty" << endl;
        return;
    } 
    Node* traverse = head;
    while(traverse)
    {
        cout << traverse->data << endl;
        traverse = traverse->next;
    }
    cout << endl << endl;
    traverse = tail;
    while(traverse)
    {
        cout << traverse->data << endl;
        traverse = traverse->previous;
    }
    cout << endl << endl;
}

void deleteNode(Node** head, Node** tail, int deleteData)
{
    Node* traversal = (*head);
    while(traversal->data != deleteData && traversal->next != NULL)
    {
        traversal = traversal->next;
    }
    if(traversal->next == NULL) 
    {
        cout << "No data found.." << endl;
    }
    else
    {
        if(traversal->next == NULL && traversal->previous == NULL)
        {
            (*head) = NULL;
            (*tail) = NULL;
        }
        else if(traversal->previous == NULL && traversal == (*head))
        {
            (*head) = traversal->next;
            (*head)->previous = NULL;
        } 
        else if(traversal->next == NULL && traversal == (*tail))
        {
            (*tail) = traversal->previous;
            (*tail)->next = NULL;
        }
        else
        {
            traversal->previous->next = traversal->next;
            traversal->next->previous = traversal->previous;

        }
    }
}

int main()
{
    Node* head = NULL;
    Node* tail = NULL;
    addAtFirst(&head, &tail, 101);
    append(&head,&tail,1);
    append(&head,&tail,34);
    append(&head,&tail,38);
    addAtFirst(&head, &tail, 100);
    print(head, tail);
    deleteNode(&head, &tail, 388);
    print(head, tail);
    return 0;
}