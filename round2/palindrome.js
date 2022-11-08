let input = 5;
let binary = input.toString(2);
let start = 0;
let end = binary.length-1;

function findBinary()
{
    let binary = '';
    let rem, div = input;;
    while(div > 0)
    {
        rem = div%2;
        div = Math.floor(div/2);
        binary = rem + binary 
    }
    return binary;
}
findBinary()
function paliondrome () {
    binary = findBinary()
    while(start !== end)
    {
        if(binary[start] != binary[end])
        {
            return "No"
        }
        start++;
        end--;
    }
return "Yes";
}
console.log(paliondrome());
