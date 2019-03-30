/**
 * 实现一个二叉树, 并实现其查找节点, 删除节点等操作
 */
class TreeNode<T> {
  right:TreeNode<T>;
  left:TreeNode<T>;
  value:T;
  constructor(left, value, right) {
    this.right = right;
    this.value = value;
    this.left = left;
  }
}

export class BinaryTree<T> {
  private root:TreeNode<T> = null;
  insert(data:T) {
    const node = new TreeNode<T>(undefined, data, undefined);
    if (this.root === null) {
      this.root = node;
    } else {
      let currentNode = this.root
      while (currentNode) {
        const { value: currentValue,
                left: currentLeft,
                right: currentRight
              } = currentNode;
        if (data < currentValue) {
          if (currentLeft) {
            currentNode = currentLeft;
          } else {
            currentNode.left = node;
            break;
          }
        } else {
          if (currentRight) {
            currentNode = currentRight;
          } else {
            currentNode.right = node;
            break;
          }
        }
      }
    }
  }
  // 中序遍历, 遍历遵循左->根->右
  inOrder() : T[] {
    let result = []
    function iterator(node:TreeNode<T>) {
      if (node) {
        iterator(node.left)
        result.push(node.value)
        iterator(node.right)
      }
    }
    iterator(this.root)
    return result
  }
  // 前序遍历, 遍历顺序根->左->右
  preOrder() : T[] {
    let result = []
    function iterator(node:TreeNode<T>) {
      if (node) {
        result.push(node.value);
        iterator(node.left)
        iterator(node.right)
      }
    }
    iterator(this.root)
    return result
  }
  // 后序遍历, 遍历顺序左->右->根
  postOrder() : T[] {
    let result = []
    function iterator(node:TreeNode<T>) {
      if (node) {
        iterator(node.left)
        iterator(node.right)
        result.push(node.value)
      }
    }
    iterator(this.root)
    return result;
  }
  getMin() : T {
    let currentNode = this.root
    while(currentNode.left) {
      currentNode = currentNode.left
    }
    return currentNode.value
  }
  getMax() : T {
    let currentNode = this.root
    while(currentNode.right) {
      currentNode = currentNode.right
    }
    return currentNode.value
  }
  find(value:T) : TreeNode<T> {
    let currentNode = this.root
    let result = null
    while (currentNode) {
      const { value:currentValue } = currentNode
      
      if (currentValue !== value) {
        if (currentValue > value) {
          currentNode = currentNode.left
        } else {
          currentNode = currentNode.right
        }
      } else {
        result = currentNode
        break
      }
    }
    return result
  }
}

class Node<T> {
  value:T;
  children?:Node<T>[];
  constructor(value, children?) {
    this.value = value;
    if (children) {
      this.children = children;
    }
  }
}

/**
 * dps: 深度优先算法, 利用栈保存需要遍历的点, 当完全遍历完一个后再遍历下一个出栈的对象
 */
export function dps<T>(tree:Node<T>) {
  const nodes = [];
  const stacks:Node<T>[] = [];
  if (tree) {
    stacks.push(tree);
    while (stacks.length) {
      const item = stacks.pop();
      nodes.push(item.value);
      if (item.children) {
        for (let i = item.children.length; i--;) {
          stacks.push(item.children[i]);
        }
      }
    }
  }
  return nodes;
}

/**
 * bps: 广度优先算法, 利用队列, 先遍历完一遍再遍历下一次的对象
 */
export function bps<T>(tree:Node<T>) {
  const nodes = [];
  const queue:Node<T>[] = [];
  if (tree) {
    queue.push(tree);
    while (queue.length) {
      // 队列遵循先进先出, 所以拿的是第一个
      const item = queue.shift();
      nodes.push(item.value);
      if (item.children) {
        // 正向遍历
        for (let i = 0; i < item.children.length; i++) {
          queue.push(item.children[i])
        }
      }
    }
  }
  return nodes;
}