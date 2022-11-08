function minJumps(arr, n)
{
    if (n == 1)                                     // n=5          | n = 4     | n = 3     | n=2
        return 0;                                   //              |           |           |
    let res = Number.MAX_VALUE;                     // res = max    | res = max | res = max | res = max
    for (let i = n - 2; i >= 0; i--) {              // i = 3        | i = 2     | i = 1     | i = 0
        if (i + arr[i] >= n - 1) {                  // 3+4 >= 4     | 2+0 > 1   | 1+3 >= 0  | 0+2 > 1
            let sub_res = minJumps(arr, i + 1);     // arr,4        | arr,3     | arr,2
            if (sub_res != Number.MAX_VALUE)        //              |           |sub = max
                res = Math.min(res, sub_res + 1);   //              |           |
        }
    }

    return res;
}

let arr = [ 2, 3, 0, 4, 1];
let n = arr.length;
console.log(minJumps(arr,n));