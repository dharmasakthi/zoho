let input = "alphabet";
// output lph
let vowels = "aeiou";
let subString = [];
let sub = "";
let count = 0;
let maxSubStrLength = 0;
for(let i=0; i<input.length; i++)
{
    if(vowels.indexOf(input[i]) == -1)
    {
        sub += input[i];
        count++;
        if(vowels.indexOf(input[i+1]) > -1 || (i+1) >= (input.length-1))
        {
            subString.push(sub);
            sub="";
            if(maxSubStrLength < count)
            {
                maxSubStrLength = count;
            }
            count = 0;
        }
    }
}
subString.forEach((value)=>{
    if(value.length == maxSubStrLength) {
        console.log(value);
    }
})
// console.log(subString, maxSubStrLength);