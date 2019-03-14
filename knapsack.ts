/**
 * * 动态规划中的`背包问题`
 * * 假设有 weights 种不同重量的物品, 他们各自的价值是 values, 在背包重量最大为 W 的情况下
 * * 怎么才能得到最大价值
 * @param weights 
 * @param values 
 * @param W 
 */
export function knapsack(weights:number[], values:number[], W:number) {
  /**
   * 建立一个二元数组存放背包表格
   * 横坐标逐渐提升背包容量 w 的值
   * 纵坐标是各个物品的情况
   * * 增加-1行, 让剩下的行数可以统一化计算
   */
  const n = weights.length;
  const table = new Array(n);
  table[-1] = new Array(W + 1).fill(0);
  // 选择的物品
  const select_item = [];

  // 建立剩下的行数
  for (let y = 0; y < n; y++) {
    const arr = table[y] = [];
    for (let x = 0; x <= W; x++) {
      /**
       * 情况只有两种, `放进该物品`与`不放该物品`
       * * 先假设放进物品, 那当前背包空位只有W - x = r， 在数据中寻找 r 列的最后一个数(即 r 的最大价值)
       * * 如果最大价值+当前物品价值 > 此列上一个值, 那么认为放进物品是最优解
       * * 否则不放进物品
       * * 所以最后放进的价值是之前最大价值或放进此物品的最大价值中比较大的那个
       */
      const rest_weight = x - weights[y];
      
      const last_max_value = table[y - 1][x];
      if (rest_weight < 0) {
        arr[x] = last_max_value;
      } else {
        const current_value = values[y];
        const rest_max_value = table[y - 1][rest_weight];
        arr[x] = Math.max(rest_max_value + current_value, last_max_value);
      }
    }
  }

  /**
   * 从最下一行往上寻找, 如果这一行的值大于上一行的, 说明最优解中放入了当前行的物品
   * 然后再减去此物品的重量, 继续寻找
   */
  let x = W, rest_weight = 10;
  for (let y = n; y--;) {
    const current_value = table[y][rest_weight];
    const last_value = table[y-1][rest_weight];
    if (current_value > last_value) {
      select_item.push(y);
      rest_weight = rest_weight - weights[y];
    }
  }
  
  
  return {
    table,
    select_item: select_item.reverse(),
  };
}