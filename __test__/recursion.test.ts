import { deepClone } from "../recursion";

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
})