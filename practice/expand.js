let input = "a2c4v5b7";
// output -- > aaccccvvvvvbbbbbbb
let output = "";
for(let i=0; i< input.length; i = i+2)
{
    output += input[i].repeat(parseInt(input[i+1]));
}
console.log(output);