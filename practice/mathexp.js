let input = "(ab+))";
// example (a+b) valid , (ab-) invalid;
let open = 0;
let close = 0;

checkValid = () => {
    for(let i=0,j = input.length-1; i<input.length; i++, j--)
    {
        if(input[i] == '(')
        {
            open ++;
        } else if (input[i] == ')')
        {
            open--;
        }
        if(input[j] == '(')
        {
            close--;
        } else if (input[j] == ')')
        {
            close++;
        }
        if(open < 0 || close < 0)
        {
            console.log("invalid");
            return false;
        }
        if(input[i] == "+" || input[i] == "-" || input[i] == "/" || input[i] == "*")
        {
            if((i-1) < 0 || (i+1)>=input.length)
            {
                console.log("invalid");
                return false;
            } else {
                let pattern = /[a-z]/i
                if(!(pattern.test(input[i-1]) && pattern.test(input[i+1])))
                {
                    console.log("invalid");
                    return false;
                }
            }
        }
    }
    return true;
}
if(checkValid())
{
    console.log("Valid");
}
