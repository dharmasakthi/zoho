let input = [11,3,9,31,4];
// output ==> [11,3,9,31,4]
evenodd = () => {
    if(input.length <= 2) {
        console.log(input);
        return;
    }
    for(let i=0; i<input.length; i++)
    {
        for(let j=i+2; j<input.length; j=j+2)
        {
            if(!(i%2))
            {
                if(input[i] < input[j])
                {
                    let temp = input[i];
                    input[i] = input[j];
                    input[j] = temp;
                }
            }
            else {
                if(input[i] > input[j])
                {
                    let temp = input[i];
                    input[i] = input[j];
                    input[j] = temp;
                }
            }
        }
    }
    return input;
}

console.log(evenodd());