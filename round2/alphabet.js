let input = "the quick brown fox jumps over lazy dog";
let inputsplit = [];

for(let i=0; i<input.length; i++)
{
    let present = false;
    if(input[i] == " ")
    {
        continue;
    }
    for(let j=0; j<inputsplit.length; j++)
    {
        if(inputsplit[j].alphabet == input[i])
        {
            present = true;
            inputsplit[j].count++;
        }
    }
    if(!present)
    {
        inputsplit.push({alphabet: input[i],count : 1});
    }
}

for(let i=0; i<inputsplit.length; i++)
{
    for(let j=0; j<inputsplit.length; j++)
    {
        if(inputsplit[i].count < inputsplit[j].count)
        {
            let temp = inputsplit[i];
            inputsplit[i] = inputsplit[j];
            inputsplit[j] = temp;
        }
    }
}

let output = '';
for(let i=0; i<inputsplit.length; i++)
{
    output += inputsplit[i].alphabet;
}
console.log(output);