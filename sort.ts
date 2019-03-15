/**
 * `冒泡排序法`
 * 原理是比较相邻的数, 前一个比后一个大就调换位置, 第一趟比较完后最后一个必定是最大的数
 */
export function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len - 1; i++) {
    for (let j = 0; j < len - i; j++) {
      let prev = arr[j];
      let next = arr[j+1];
      if (prev > next) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}

/**
 * `选择排序法`
 * 原理是先用第一个元素与其他做比较, 然后选出最小的放在第一位,
 */
export function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      const v1 = arr[i];
      const v2 = arr[j];
      if (v2 < v1) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

/**
 * `插入排序法`
 * 原理是先选择一个数(一般是第一个数), 然后把数组剩下的数字按照大小排列插入到已经排好的这个序列中
 */

export function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i + 1; j--;) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      } else {
        break;
      }
    }
  }
  
  return arr;
}