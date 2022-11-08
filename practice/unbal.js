let input = "((abc)((de))";
input = input.split('');

let open = 0, close = 0;
let length = input.length;

let i = 0, j = length-1;

while(i < length && j >= 0)
{
    if(input[i] == '(')
	{
		open++;
	} else if(input[i] == ')')
	{
		open--;
	}
	if(open < 0) 
	{
		input.splice(i,1);
        open = 0;
	}
    if(input[j] == '(')
	{
		close--;
	} else if(input[j] == ')')
	{
		close++;
	}
	if(close < 0) 
	{
		input.splice(j,1);
        close = 0;
	}
    i++;
    j--;
}
input = input.join('')
console.log(input);