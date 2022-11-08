#include <iostream>
using namespace std;

int main() {

  int input[] = {2,4,8,90,77,54};
  // output 4 8 54 -1 -1 -1
  int length = sizeof(input)/sizeof(input[0]);
  int nextBig;
  for(int i=0; i<6; i++)
    {
      nextBig = 1000;
      for(int j=i+1; j<6; j++)
        {
          // if(j==length)
         
          if(input[i] < input[j])
          {
            if(input[j] < nextBig)
            {
              nextBig = input[j];
            }
          }
        }
      if(nextBig == 1000)
      {
        cout << "-1\t";
      }
      else {
        cout << nextBig << '\t';
      }
    }
    cout << endl;
}