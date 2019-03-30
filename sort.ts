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

/**
 * `快速排序法`
 * 原理是选择数组中的某个数进行比较, 递归依次把比这个数小的数放在它之前, 比它大的放在之后
 */
export function quickSort(nums:number[]) : number[] {
  if (nums.length <= 1) {
    return nums; //  递归出口
  }
  const left = [];
  const right = [];
  const target = nums.shift(); // 取出数组中第一位作为比较对象, 并去掉数组第一位
  for (let i = nums.length; i--;) {
    const item = nums[i]
    if (item > target) {
      right.push(item)
    } else {
      left.push(item)
    }
  }
  
  return [...quickSort(left), target, ...quickSort(right)];
}

/**
 * 堆排序
 * 思想: 利用堆结构来进行排序, 此算法实现的是大顶堆
 * 大顶堆规则: 每一个根节点都比其左右节点大, 因此大顶堆最大的元素就是根节点
 */
export class HeapSort {
  private arr = [];
  constructor(arr) {
    this.arr = arr;
  }
  /**
   * 调整大顶堆的结构, 使其可以合乎大顶堆规则
   * @param index 检查的起始下标
   * @param heapSize 堆大小
   */
  maxHeapify(arr, index, heapSize) {
    let iMax, iLeft, iRight;
    do {
      iMax = index;
      iLeft = this._getLeftNodeIndex(iMax);
      iRight = this._getRightNodeIndex(iMax);
      if (arr[iMax] < arr[iLeft] && iLeft < heapSize) {
        iMax = iLeft;
      }
      if (arr[iMax] < arr[iRight] && iRight < heapSize) {
        iMax = iRight;
      }
      // 如果最大数被交换了, 继续调整
      if (iMax !== index) {
        [arr[index], arr[iMax]] = [arr[iMax], arr[index]];
        index = iMax;
        iMax = undefined;
      }
    } while (iMax !== index)
  }
  /**
   * 将一个普通数组通过调整转化成大顶堆结构
   * @param arr 传入数组
   */
  buildMaxHeapify(arr) {
    const heapSize = arr.length;
    // 注意, 此 iParent 不是指根节点的 index, 而是指创建大顶堆需要开始的下标
    // 即倒数第二层最后一个前面是完全排列节点的节点
    const iParent = Math.floor((heapSize - 1) / 2);
    for (let i = iParent; i >= 0; i--) {
      // 只有比下标小的节点才拥有叶子节点, 才需要调整比较
      this.maxHeapify(arr, i, heapSize);
    }
  }
  heapifySort() {
    const { arr } = this;
    let size = arr.length;
    this.buildMaxHeapify(arr);
    
    for (let i = size - 1; i > 0; i--) {
      [arr[i], arr[0]] = [arr[0], arr[i]];
      // 把最大数移到数组尾后, 把末尾数移到堆的根节点, 然后末尾数下沉找到自己的位置后又形成堆
      this.maxHeapify(arr, 0, --size);
    }
    
    return arr;
  }
  _getLeftNodeIndex(index) {
    return 2 * index + 1;
  }
  _getRightNodeIndex(index) {
    return 2 * (index + 1);
  }
}