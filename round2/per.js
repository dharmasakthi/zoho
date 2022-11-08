
function permutation(str, start, end)
{
    if (start == end)
            console.log(str);
        else
        {
            for (let i = start; i <= end; i++)
            {
                str = swap(str, start, i);
                permutation(str, start + 1, end);
                str = swap(str, start, i);
            }
        }
}
  
function swap(s, i, j)
{
    let temp;
    let string = s.split("");
    temp = string[i] ;
    string[i] = string[j];
    string[j] = temp;
    return (string).join("");
}
  
let input = "good";
let length = input.length;
permutation(input, 0, length-1);




