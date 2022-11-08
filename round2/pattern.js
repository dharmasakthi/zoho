let input = 4;
let output = []
pattern(input)
let size = 2 * input - 1;

function pattern(input)
{
    let size = 2 * input - 1; 
    let start = 0;
    let end = size-1;
    for (let i = 0; i< size; i++) {
        for(let j = 0; j< size; j++) {
            output[i] = [];
        }
    }
    while( input != 0)
    {
        for (let i = start; i <= end; i++) {
            for (let j = start; j <= end; j++) {
                if (i == start || i == end ||
                    j == start || j == end)
                output[i][j] = input;
            }
            }
            start++;
            end--;
            input--;
    }
}

let printOutput = '';

for(let i=0; i<size; i++)
{
    for(let j=0; j<size; j++)
    {
        printOutput += output[i][j];
    }
    printOutput += "\n";
}
console.log(printOutput);