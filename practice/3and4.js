let input = 13;
// base of 3 and 4 as line 0 and 1
input++;
let power = Math.floor(Math.log2(input));
let result = (input)-(Math.pow(2,power));
result = result.toString(2);
// console.log(result);
let str = '';
while(power)
{
    let temp = Math.floor(result % 10);
    // console.log("temp-->",temp);
    if(temp)
    {
        str = '4' + str;
    } else 
    {
        str = '3' + str;
    }
    power--;
    result = result / 10;
}
console.log(str);