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

// 判断一个数是不是回文数
export function palindrome_number(x:number) : boolean {
  // 最后一位是0且不是0本身的话, 倒过来会缺少一位0 所以肯定不是回文数
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }
  // 获取 x 的后半段数字
  let x_half_last = 0;
  while (x > x_half_last) {
    x_half_last = x_half_last * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  
  /**
   * * 当x的位数为奇数时, 根据上述的判断会给 x_half_last 多判一个中位数
   * * 但此中位数是不影响结果的, 所以我们可以把它去掉
   */
  return x === x_half_last || x === Math.floor(x_half_last / 10);
}

// 罗马数字转整数
export function roman_to_integer(s:string) : number {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let num = 0;
  while (s.length) {
    // 如果当前字符在 map 中比下一个字符小, 则认为他们代表一个数
    const current_char = s.charAt(0);
    const next_char = s.charAt(1);
    if (next_char && map[current_char] < map[next_char]) {
      num += map[next_char] - map[current_char];
      s = s.substring(2);
    } else {
      num += map[current_char];
      s = s.substring(1);
    }
  }
  return num;
}

// 最长公共前缀
export function longest_common_prefix(strs:string[]) : string {
  let result = ''
  if (strs.length === 0) {
    return ''
  }
  if (strs.length === 1) {
    return strs[0]
  }
  for (let i = 0; i < strs[0].length; i++) {
    let current_char = strs[0].charAt(i);
    let is_same = true
    for (let j = 0; j < strs.length; j++) {
      if (strs[j].charAt(i) !== current_char) {
        is_same = false
        break
      }
    }
    if (is_same) {
      result += current_char
    } else {
      break;
    }
  }
  return result
}

// 判断大中小括号是否正确的跟最邻近的对应括号匹配, 此字符串中只含有这些括号
export function valid_parentheses(s:string) : boolean {
  if (!s.length) {
    return true;
  }
  let reg = /\(\)|\[\]|\{\}/g;
  while(reg.test(s)) {
    s = s.replace(reg, '');
  }
  return s.length === 0;
}

// 去除一个已经排过序的数组的重复项
export function remove_duplicates_from_sorted_array(nums:number[]) : number {
  if (nums.length < 2) {
    return nums.length
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
  
  return nums.length
}

export function remove_element(nums:number[], val:number) : number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
}

export function search_insert_position(nums:number[], target:number) : number {
  if (target > nums[nums.length - 1]) {
    return nums.length;
  }
  if (target < nums[0]) {
    return 0;
  }
  let index = 1;
  function split_arr_and_check(arr:number[], target) {
    if (arr.length === 1) {
      return;
    }
    const middle_num = Math.floor(arr.length / 2);
    const left_arr = arr.slice(0, middle_num);
    const right_arr = arr.slice(middle_num)
    
    if (target <= right_arr[0]) {
      split_arr_and_check(left_arr, target);
    } else {
      split_arr_and_check(right_arr, target);
      index += middle_num;
    }
  }
  split_arr_and_check(nums, target)
  return index
}
