let input = 300;
function alpa(rem)
{
    switch (rem) {
        case 0:
            rem='0';
            break;
        case 1:
            rem='A';
            break;
        case 2:
            rem="B";
            break;
        case 3:
            rem="C";
            break;
        case 4:
            rem="D";
            break;
        case 5:
            rem="E";
            break;
        case 6:
            rem="F";
            break;
        case 7:
            rem="G";
            break;
        case 8:
            rem="H";
            break;
        case 9:
            rem="I";
            break;
        case 10:
            rem="J";
            break;
        case 11:
            rem="K";
            break;
        case 12:
            rem="L";
            break;
        case 13:
            rem="M";
            break;
        case 14:
            rem="N";
            break;
        case 15:
            rem="O";
            break;
        case 16:
            rem="P";
            break;
        case 17:
            rem="Q";
            break;
        case 18:
            rem="R";
            break;
        case 19:
            rem="S";
            break;
        default:
            break;
    }
    return rem;
}
function findBinary()
{
    let binary = '';
    let rem, div = input;;
    while(div > 0)
    {
        rem = div%20;
        div = Math.floor(div/20);
        rem = alpa(rem);
        binary = rem + binary 
    }
    return binary;
}
console.log(findBinary());