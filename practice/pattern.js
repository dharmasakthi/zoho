//output
// 9       1
//  8     2 
//   7   3  
//    6 4   
//     5    
//    4 6   
//   3   7  
//  2     8 
// 1       9
let input = 9, x = input, y = 1, front = 0, back = 0, gap = input;
for (let i = 0; i < input; i++) {
    let between = "";
    if(x!=y)
    {
        gap = gap - 2;
        between = " ".repeat(Math.abs(gap));
    }
    console.log(`${" ".repeat(Math.abs(front))}${x==y ? x : x + between + y}${" ".repeat(Math.abs(back))}`);
    front++;
    back++;
    x--; 
    y++;
    if((front+1 == back+1) && (front+1 == (input+1)/2))
    {
        front = -1 * front;
        back = -1 * back;
    }

}