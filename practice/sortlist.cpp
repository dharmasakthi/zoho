# include <iostream>
using namespace std;

struct Node 
{
    int data;
    struct Node *next;
};

void append(Node **root, int data)
{
    struct Node *node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->next = NULL;
   if(*root == NULL)
   {
        (*root) = node;
        return;
   }
    struct Node *traverse = *root;
    while(traverse->next != NULL)
    {
        traverse = traverse->next;
    }
    traverse->next = node;
    return;
}

void deleteItem(struct Node **root, int data, bool isDelete = true)
{
    if(*root == NULL)
    {
        cout << "Empty List";
        return;
    }
    struct Node *node = *root;
    if(node->data == data)
    {
        if(isDelete)
        {
            *root = node->next;
            cout << "Deleted" << endl;
        }
        else 
        {
            cout << "Item found";
        }
        return;

    }
    struct Node *previous = (struct Node*)malloc(sizeof(struct Node));
    previous = node;
    node = node->next;
    while(node)
    {
        if(node->data == data)
        {
            if(isDelete)
            {
                previous->next = node->next;
                cout << data << " --> Deleted" << endl;
            }
            else 
            {
            cout << data << " --> Item found" << endl;
            }
            return;
        }
        node = node->next;
        previous = previous->next;
    }
    if(node == NULL)
    {
        cout << "Not Found" << endl;
        return;
    }
}

void printList(struct Node *root)
{
    if(root == NULL)
    {
        cout << "empty" << endl;
        return;
    }
    struct Node *node = root;
    while(node != NULL)
    {
        cout << node->data << endl;
        node = node->next;
    }
    cout << endl << endl;
    return;
}

void sort(struct Node **root)
{
    if(*root == NULL)
    {
        cout << "List empty" << endl;
        return ;
    }
    struct Node *traversal_1 = *root;
    struct Node *traversal_2 = *root;
    while(traversal_1->next)
    {
        traversal_2 = traversal_1->next;
        while(traversal_2)
        {
            if(traversal_1->data > traversal_2->data)
            {
                int data;
                data = traversal_1->data;
                traversal_1->data = traversal_2->data;
                traversal_2->data = data;
            }
            traversal_2 = traversal_2->next;
        }
        traversal_1 = traversal_1->next;
    }
}

int main()
{
    struct Node *root = NULL;
    append(&root, 5);
    append(&root, 4);
    append(&root, 3);
    append(&root, 2);
    append(&root, 1);
    cout << "Before Sort" << endl;
    printList(root);
    sort(&root);
    cout << "After Sort" << endl;
    printList(root);
    deleteItem(&root, 3);
    deleteItem(&root, 5, false);
    printList(root);
    return 0;
}