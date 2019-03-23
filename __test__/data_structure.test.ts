import { BinaryTree } from './../data_structure';
describe('测试数据结构', () => {
  test('测试二叉树', () => {
    const binary_tree = new BinaryTree();
    const arr = [20, 9, 77, 56, 3, 90, 8];
    arr.forEach((item) => {
      binary_tree.insert(item);
    })
    expect(binary_tree.inOrder()).toEqual([3, 8, 9, 20, 56, 77, 90])
    expect(binary_tree.preOrder()).toEqual([20, 9, 3, 8, 77, 56, 90])
    expect(binary_tree.postOrder()).toEqual([8, 3, 9, 56, 90, 77, 20])
    expect(binary_tree.getMin()).toEqual(3)
    expect(binary_tree.getMax()).toEqual(90)
    expect(binary_tree.find(8).value).toEqual(8)
    expect(binary_tree.find(39)).toEqual(null)
  })
})