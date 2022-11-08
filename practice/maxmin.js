let input = [1,4,5,2,7,4,9,5,8]
//output = [9,1,8,2,7,4,5,4,5]
let output = [];

while(input.length > 0) {
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    let maxIndex;
    let minIndex;
    input.forEach((value, i) => {
        if(max < value) {
            max = value;
            maxIndex = i;
        }
    });
    output.push(max);
    input.splice(maxIndex,1);
    if(input.length) {
        input.forEach((value, i) => {
            if(min > value) {
                min = value;
                minIndex = i;
            }
        });
        output.push(min);
        input.splice(minIndex,1);
    }
}
console.log(output);