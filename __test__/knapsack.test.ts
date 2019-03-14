import { knapsack } from '../knapsack';
describe('背包问题', () => {
  const weights = [2, 2, 6, 5, 4];
  const values = [6, 3, 5, 4, 6];
  const W = 10;
  test('能正确建立第一行', () => {
    expect(knapsack(weights, values, W).table[0]).toEqual(
      [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6]
    );
  })
  test('能正确建立最后一行', () => {
    expect(knapsack(weights, values, W).table[4]).toEqual(
      [0, 0, 6, 6, 9, 9, 12, 12, 15, 15, 15]
    );
  })
  test('能正确返回放进背包的物品', () => {
    expect(knapsack(weights, values, W).select_item).toEqual(
      [0, 1, 4]
    )
  })
})