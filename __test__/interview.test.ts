import { deepCloneDps } from "../interview";

describe('测试面试题', () => {
  test('深度/广度优先实现深拷贝(简单版, 没考虑 set map symbol)', () => {
    const obj = {
      c: {
        a: {
          d: {
            e: '666'
          }
        }
      }
    }
    const arr = [{
      a: {
        b: 5,
      }
    }, {
      c: {
        f: 3
      }
    }]
    expect(deepCloneDps(obj)).toEqual({
      c: {
        a: {
          d: {
            e: '666'
          }
        }
      }
    })
    expect(deepCloneDps(arr)).toEqual([{
      a: {
        b: 5,
      }
    }, {
      c: {
        f: 3
      }
    }])
  })
})