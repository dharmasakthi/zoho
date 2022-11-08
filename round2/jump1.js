function jump(arr,n)
{
	if (n <= 1)
		return 0;
	if (arr[0] == 0)
		return -1;
	let maxReach = arr[0];
	let step = arr[0];
	let jump = 1;
	let i = 1;
	for (i = 1; i < n; i++) {
		if (i == n - 1)
			return jump;
		maxReach = Math.max(maxReach, i + arr[i]);
		step--;
		if (step == 0) {
			jump++; 
			if (i >= maxReach)
				return -1;
			step = maxReach - i;
		}
	}
	return -1;
}

let input = [ 1, 3, 6, 3, 2,3, 6, 8, 9, 5];
let length = input.length;
console.log(jump(input, length));


