//output
//1
//11
//21
//1211
//111221
//312211
//13112221

let input = 15;
let str = '1'
console.log(str);
let iterate = 0;
for(let i=0; i<input-1; i++)
{
    let count = 0;
    let search = str[0];
    let rstr = '';
    for(let j=0; j<str.length; j++)
    {
        if(search == str[j])
        {
            count++;
        }
        if(search != str[j+1])
        {
            rstr += count.toString() + str[j];
            count = 0;
            search = str[j+1];
        }
        iterate++;
    }
    str = rstr;
    console.log(str);
}
console.log("-->",iterate)