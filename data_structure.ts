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