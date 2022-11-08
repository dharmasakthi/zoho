#include <iostream>
#include <string.h>
using namespace std;

class Child
{
  public:
  char childName[20];
  char gender[10];
};

class Parent
{
  public:
  char maleParent[20];
  char femaleParent[20];
  Child* children;
};

int main() {

  Parent parents[20];
  for(int i=0 ; i<5; i++)
    {
      char maleParent[20];
      char femaleParent[20];
      char children[20];
      char gender[20];
      cin >> children >> gender >> maleParent >> femaleParent;
      strcpy(parents[i].maleParent,maleParent);
      strcpy(parents[i].femaleParent,femaleParent);
      Child* child1 = new Child();
      strcpy(child1->childName , children);
      strcpy(child1->gender , gender);
      parents[i].children = child1;  
    }
  char findMatchFor[20];
  char findMatchForGender[20];
  char maleParent[20];
  char femaleParent[20];
  int maleParentSimb[10];
  int femaleParentSimb[10];
  int maleParentParentIndex;
  cin >> findMatchFor;
  int parentIndex;
  for(int i =0; i<5; i++)
    {
      if(strcmp(parents[i].children->childName,findMatchFor) == 0)
      {
        parentIndex = i;
        strcpy(findMatchForGender,parents[i].children->gender);
      }
    }
  cout << parentIndex << endl;
  for(int i=0; i<5; i++)
    {
      if(strcmp(parents[i].children->childName,parents[parentIndex].maleParent)==0)
      {
        maleParentParentIndex = i;
      }
    }
  cout << maleParentParentIndex << endl;
int j=-1;
  for(int i=0; i<5; i++)
    {
      if((strcmp(parents[i].maleParent,parents[maleParentParentIndex].maleParent)==0) && (strcmp(parents[i].children->gender,"female")==0))
      {
        j++;
        maleParentSimb[j] = i;
      }
    }

 
  for(int i=0; i<5 ; i++)
    {
    for(int k=0 ; k<=j; k++)
      {
        if((strcmp(parents[maleParentSimb[k]].children->childName,parents[i].femaleParent)==0) && (strcmp(parents[i].children->gender,"female") == 0))
        {
          cout << parents[i].children->childName << ", ";
        }
      }
     
    }
  // if(strcmp(findMatchForGender,"male") == 0)
  // {
     
  // }
  // for(int i=0; i<5; i++)
  //   {
  //     cout << parents[i].maleParent << "\t" <<     parents[i].femaleParent << "\t" <<parents[i].children->childName << "\t" << parents[i].children->gender << endl;
  //   }
//  cout << "hi";
  return 0;
}