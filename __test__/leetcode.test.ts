import { reverse_integer, palindrome_number, roman_to_integer, longest_common_prefix, valid_parentheses, remove_duplicates_from_sorted_array, remove_element, search_insert_position } from '../leetcode';
describe('刷 leetcode', () => {
  test('整数反转', () => {
    expect(reverse_integer(123)).toBe(321);
    expect(reverse_integer(-123)).toBe(-321);
    expect(reverse_integer(120)).toBe(21);
    expect(reverse_integer(-120)).toBe(-21);
  })
  test('回文数', () => {
    expect(palindrome_number(121)).toBe(true);
    expect(palindrome_number(-121)).toBe(false);
    expect(palindrome_number(10)).toBe(false);
    expect(palindrome_number(11)).toBe(true);
  })
  test('罗马数字转整数', () => {
    expect(roman_to_integer('III')).toBe(3);
    expect(roman_to_integer('IV')).toBe(4);
    expect(roman_to_integer('IX')).toBe(9);
    expect(roman_to_integer('LVIII')).toBe(58);
    expect(roman_to_integer('MCMXCIV')).toBe(1994);
  })
  test('最长公共前缀', () => {
    expect(longest_common_prefix(["flower","flow","flight"])).toBe('fl')
    expect(longest_common_prefix(["dog","racecar","car"])).toBe('')
  })
  test('判断是否正确的闭合了括号', () => {
    expect(valid_parentheses('()')).toBe(true);
    expect(valid_parentheses('()[]{}')).toBe(true);
    expect(valid_parentheses('(]')).toBe(false);
    expect(valid_parentheses('([)]')).toBe(false);
    expect(valid_parentheses('{[]}')).toBe(true);
  })
  test('给排序过的数组去重并返回去重后数组的长度', () => {
    const arr1 = [1, 1, 2]
    const arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    expect(remove_duplicates_from_sorted_array(arr1)).toBe(2);
    expect(arr1).toEqual(
      [1, 2]
    )
    expect(remove_duplicates_from_sorted_array(arr2)).toBe(5);
    expect(arr2).toEqual(
      [0, 1, 2, 3, 4]
    )
  })
  test('在原数组中移除输入的项', () => {
    const arr1 = [3, 2, 2, 3]
    const arr2 = [0, 1, 2, 2, 3, 0, 4, 2]
    expect(remove_element(arr1, 3)).toBe(2);
    expect(arr1).toEqual([2, 2])
    expect(remove_element(arr2, 2)).toBe(5)
    expect(arr2).toEqual(
      [0, 1, 3, 0, 4]
    )
  })
  test('搜索有序数组的插入位置', () => {
    const arr = [1, 3, 5, 6]
    expect(search_insert_position(arr, 5)).toBe(2);
    expect(search_insert_position(arr, 2)).toBe(1);
    expect(search_insert_position(arr, 7)).toBe(4);
    expect(search_insert_position(arr, 0)).toBe(0);
  })
})