export function reverse_integer(x:number) : number {
  const MAX = Math.pow(2, 31);
  let arr = x.toString().split('').reverse();
  if (x < 0) {
    arr.pop();
    arr.unshift('-');
  }
  let result = Number(arr.join(''));
  if (result > MAX - 1 || result < -MAX) {
    result = 0
  }
  return result
}

