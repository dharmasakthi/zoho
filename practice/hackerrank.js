function primeCount(n) {
    let count = 0;
    let product = 1;
    if(n == 1) {
        return count;
    } else if(n == 2 || n == 3) {
        count++;
        return count;
    } else {
        for(let i=2; i <= n; i++) {
            if(checkForPrime(i)) {
                // console.log(i , " ----> ", checkForPrime(i));
                if((product*i) <= n) {
                    console.log("1 ---->", product , " * " , i , " = ", product*i , "  --  ", n);
                    product *= i;
                    // console.log("2 ---->", product)
                    count++;
                } else {
                    return count;
                }
            }
        }
    }
}

function checkForPrime(n) {
    for(let i = 2; i<n; i++) {
        if(n%i == 0) {
            return false;
        }
    }
    return true;
}

function main() {
    let input = BigInt(614889782588491409);
    // let input =[
    //     // 614889782588491410,
    //     614889782588491409]
    //     614889782588491408,
    //     614889782588491407,
    //     6148897825884914,
    //     614889782588,
    //     614889782588491410,
    //     614889782588491411,
    //     614889782588491412,
    //     614889782588491413,
    //     614889782588491415
    // ]
    // input.forEach(element => {
        console.log(primeCount(input));
    // });
    console.log(input);
}
main();