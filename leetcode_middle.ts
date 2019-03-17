/**
 * 传入细胞板当前状态, 并获取其下一个状态
 * 规则
 * * 1. 活细胞周围八个位置的活细胞数量少于两个, 活细胞死亡
 * * 2. 活细胞周围有两个/三个活细胞, 则依然存活
 * * 3. 活细胞周围有超过三个活细胞, 活细胞死亡
 * * 4. 死细胞周围有正好三个活细胞, 死细胞复活
 * @param board 细胞板的细胞状态, `1`代表`活细胞`. `0`代表`死细胞`
 */
export function game_of_life(board:number[][]) {
  /**
   * 使用原地算法, 对当前状态与改变状态进行编码
   * * `2`代表从`活细胞`变成`死细胞`
   * * `3`代表从`死细胞`变成`活细胞`
   */
  function check_is_alive(status) {
    return (status === 1 || status === 2)
  }
  function get_next_status(current_status, near_alive_cell) : number {
    const is_current_alive = check_is_alive(current_status);
    if (is_current_alive && near_alive_cell !== 2 && near_alive_cell !== 3) {
      return 2
    }
    if (!is_current_alive && near_alive_cell === 3) {
      return 3
    }
    return current_status
  }
  // 用 3*3 矩阵开始扫描, 对细胞状态进行编码
  const row_length = board[0].length
  const col_length = board.length
  for (let i = 0; i < col_length; i++) {
    for (let j = 0; j < row_length; j++) {
      let alive_num = 0;
      // 左边
      if (j > 0) {
        alive_num += +check_is_alive(board[i][j - 1])
        // 左上角
        if (i > 0) {
          alive_num += +check_is_alive(board[i - 1][j - 1])
        }
        // 左下角
        if (i + 1 < col_length) {
          alive_num += +check_is_alive(board[i + 1][j - 1])
        }
      }
      // 右边
      if (j + 1 < row_length) {
        alive_num += +check_is_alive(board[i][j + 1])
        // 右上角
        if (i > 0) {
          alive_num += +check_is_alive(board[i - 1][j + 1])
        }
        // 右下角
        if (i + 1 < col_length) {
          alive_num += +check_is_alive(board[i + 1][j + 1])
        }
      }
      // 上边
      if (i > 0) {
        alive_num += +check_is_alive(board[i - 1][j])
      }
      // 下边
      if (i + 1 < col_length) {
        alive_num += +check_is_alive(board[i + 1][j])
      }
      
      board[i][j] = get_next_status(board[i][j], alive_num);
    }
  }
  // 解码
  for (let i = col_length; i--;) {
    for (let j = row_length; j--;) {
      const item = board[i][j]
      if (item === 2) {
        board[i][j] = 0
      }
      if (item === 3) {
        board[i][j] = 1
      }
    }
  }
}