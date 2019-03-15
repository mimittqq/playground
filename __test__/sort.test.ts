import { bubbleSort, selectSort, insertSort } from "../sort";

describe('能正确排序', () => {
  test('冒泡排序', () => {
    const arr = [10, 4, 3, 12, 6, 18];
    expect(bubbleSort(arr)).toEqual([3, 4, 6, 10, 12, 18]);
  })
  test('选择排序', () => {
    const arr = [10, 4, 3, 12, 6, 18];
    expect(selectSort(arr)).toEqual([3, 4, 6, 10, 12, 18]);
  })
  test('插入排序', () => {
    const arr = [10, 4, 3, 12, 6, 18];
    expect(insertSort(arr)).toEqual([3, 4, 6, 10, 12, 18]);
  })
})