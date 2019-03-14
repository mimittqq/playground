import { reverse_integer } from '../leetcode';
describe('刷 leetcode', () => {
  test('整数反转', () => {
    expect(reverse_integer(123)).toBe(321);
    expect(reverse_integer(-123)).toBe(-321);
    expect(reverse_integer(120)).toBe(21);
    expect(reverse_integer(-120)).toBe(-21);
  })
})