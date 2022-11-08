#include<iostream>
using namespace std;

struct Node 
{
    int data;
    Node* left;
    Node* right;
};

struct Node* newNode(int data)
{
    Node* temp;
    temp->data = data;
    temp->left = temp->right = NULL;
    return temp;
}

struct Node* insert(Node* node, int data)
{
    if(node == NULL)
    {
        return newNode(data);
    }
    else
    {
        if(data < node->data)
        {
            node->left = insert(node->left, data);
        }
        else
        {
            node->right = insert(node->right, data);
        }
    }
    return node;
}

int main()
{
    struct Node* root = NULL;
    root = insert(root, 10);
    root = insert(root, 5);
    root = insert(root, 6);
    root = insert(root, 4);
    root = insert(root, 15);
    root = insert(root, 12);
    root = insert(root, 13);
    root = insert(root, 16);
}