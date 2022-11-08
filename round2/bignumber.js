let input = [8,4,1,9,6,2];
let output = "";
for(let i=0; i<input.length; i++)
{
    let nextBig = Number.MAX_SAFE_INTEGER;
    for(let j=0; j<input.length; j++)
    {
        if(input[i] < input[j])
          {
            if(input[j] < nextBig)
            {
              nextBig = input[j];
            }
          }
    }
    if(nextBig == Number.MAX_SAFE_INTEGER)
    {
        output += `${input[i]}->,`;
    }
    else {
        output += `${input[i]}->${nextBig},`;
    }
}
console.log(output)