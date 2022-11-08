let input = [2,1,2,2,0,3,7];

function jump(input, start, end)
{
    if(start >= end)
    {
        return 0;
    }
    let minCount = Number.MAX_SAFE_INTEGER;
    for(let j=1; j<=input[start] && j<end ; j++)
    {   
        let count = 1 + jump(input, start + j, end);
        console.log("----> count : ", count ,"  ---> start : ", start, " --> index : ", j );
        if(count < minCount)
        {
            minCount = count;
        }
    }
    return minCount;
}

let output = jump(input,0,input.length-1);

if(output == Number.MAX_SAFE_INTEGER)
{
    console.log(-1);
}
else {
    console.log(output);
}