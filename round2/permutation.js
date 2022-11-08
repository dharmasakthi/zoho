// let input = ["A", "B", "C"];
// let output = [];
// for(let i=0; i<input.length; i++)
// {
//     for(let j=i; j<input.length; j++)
//     {
//         for(let k=j+1; k<input.length; k++)
//         {
//             let temp = input;
//             console.log(temp[j], "---->" , temp[i])
//             let t = temp[k];
//             temp[k] = temp[j];
//             temp[j] = t;
//             console.log(temp);
//             // output.push(temp);
//         }
//     }
//     // output += '\n';
// }

// console.log(output)

function permute(str, l, r)
{
    if (l == r)
            console.log(str);
        else
        {
            for (let i = l; i <= r; i++)
            {
                str = swap(str, l, i);
                permute(str, l + 1, r);
                str = swap(str, l, i);
            }
        }
}
  
function swap(a, i, j)
{
    let temp;
    let charArray = a.split("");
    temp = charArray[i] ;
    charArray[i] = charArray[j];
    charArray[j] = temp;
    return (charArray).join("");
}
  
let str = "ABC";
let n = str.length;
permute(str, 0, n-1);