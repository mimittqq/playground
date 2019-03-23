import { deepClone, falt } from "../recursion";

describe('递归练习', () => {
  test('深拷贝', () => {
    const obj = {
      xiaohong: {
        age: 14,
        subject: ['math', 'chinese']
      },
      xiaoming: {
        age: 12,
        subject: ['math', 'english']
      }
    }
    expect(deepClone(obj)).toEqual(
      {
        xiaohong: {
          age: 14,
          subject: ['math', 'chinese']
        },
        xiaoming: {
          age: 12,
          subject: ['math', 'english']
        }
      }
    );
  })
  test('扁平化', () => {
    expect(falt([1, 2, [3, [4, 5]]])).toEqual([1, 2, 3, 4, 5])
  })
})