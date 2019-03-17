import { game_of_life } from "../leetcode_middle";

describe('刷 leetcode 中等题', () => {
  test('生命游戏', () => {
    const arr = [
      [0,1,0],
      [0,0,1],
      [1,1,1],
      [0,0,0]
    ]
    game_of_life(arr)
    expect(arr).toEqual(
      [
        [0,0,0],
        [1,0,1],
        [0,1,1],
        [0,1,0]
      ]
    )
  })
})