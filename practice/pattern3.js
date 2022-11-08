// input = 4
// output 
//              0
//          1   0   1
//      2   1   0   1   2
//  3   2   1   0   1   2   3

let input = 10;
let space = "\t";
let loop = 1;
let output = "";
for(let i=0; i<input; i++)
{
    output += space.repeat(input-i-1);
    let start = i;
    for(let j = 0; j<loop; j++)
    {
        let temp = Math.abs(start);
        output += temp.toString() + "\t";
        start--;
    }
    loop +=2;
    if(i < input-1)
        output += "\n";
}

console.log(output);
