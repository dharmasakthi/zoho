//input = 5
//output
//                                 1
//                         6       2
//                 10      7       3
//         13      11      8       4
// 15      14      12      9       5
let input = 8;
let space = '\t';
let lineDiff = input;
let lastDiff = input;

console.log(`${space.repeat((input-1))}1`);

for(let i=2; i<=input; i++)
{
    let initialNumber, inlineDiff, output;

    initialNumber = 1 + lineDiff;
    output = `${initialNumber}`
    inlineDiff = input+1-i;

    for(let j=2; j<=i; j++)
    {
        initialNumber -= inlineDiff;
        output += `\t${initialNumber}`;
        inlineDiff++;
    }

    lineDiff += lastDiff-1;
    lastDiff--;

    console.log(`${space.repeat((input-i))}${output}`);
}