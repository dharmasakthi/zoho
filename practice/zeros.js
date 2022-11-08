let input = [1,1,1,1,0,1,1,0,0,1,0,1,0,0,1,0]
// output the max substring which has equal 1's and 0's
let startIndex, endIndex, zerosCount=0, onesCount=0, totalCount=0;

for(let i=0; i<input.length; i++)
  {
    for(let j=i; j<input.length; j++)
      {
        if(input[j] == 0)
        {
          zerosCount++;
        } else if(input[j] == 1) {
          onesCount++;
        }
        if(zerosCount == onesCount)
        {
          if(totalCount < (zerosCount+onesCount))
          {
            totalCount = zerosCount+onesCount;
            startIndex = i;
            endIndex = j;
          }
        }
      }
      zerosCount = 0;
      onesCount = 0;
    }
    if(totalCount == 0)
    {
        console.log("No Sub array found");
    }
    else {

        console.log(`${startIndex}  ${endIndex}`)
    }
