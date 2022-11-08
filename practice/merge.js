let a = [4,78, 99, 222];
let b = [1,50,60,200,500, 1000, 1500];
// result = [1,4,50,60,78,99,200,222,500,1000,1500]
let aLen = a.length;
let bLen = b.length;

let i = 0, j = 0;
let merge = [];

while(i < aLen || j < bLen)
{
    if(j < bLen && i < aLen) {
        if(a[i]>b[j]) {
            merge.push(b[j])
            j++;
        } else {
            merge.push(a[i]);
            i++;
        }
    }
    if( i >= aLen && j < bLen)
    {
        merge.push(b[j]);
        j++;
    } else if (j >= bLen && i < aLen) {
        merge.push(a[i]);
        i++;
    }
}
console.log(merge);