import { checkWinner, isBoardFull } from "./utils.js";

/**
 * AI Class - Implementa o algoritmo Minimax para o bot do jogo da velha.
 */
export class AI {
      getBestMove(board) {
                let bestScore = -Infinity;
                let move;

          for (let i = 0; i < 9; i++) {
                        if (board[i] === null) {
                                          board[i] = "O";
                                          let score = this.minimax(board, 0, false);
                                          board[i] = null;
                                          if (score > bestScore) {
                                                                bestScore = score;
                                                                move = i;
                                          }
                        }
          }
                return move;
      }

    minimax(board, depth, isMaximizing) {
              const result = checkWinner(board);
              if (result) {
                            return result.winner === "O" ? 10 - depth : depth - 10;
              }
              if (isBoardFull(board)) {
                            return 0;
              }

          if (isMaximizing) {
                        let bestScore = -Infinity;
                        for (let i = 0; i < 9; i++) {
                                          if (board[i] === null) {
                                                                board[i] = "O";
                                                                let score = this.minimax(board, depth + 1, false);
                                                                board[i] = null;
                                                                bestScore = Math.max(score, bestScore);
                                          }
                        }
                        return bestScore;
          } else {
                        let bestScore = Infinity;
                        for (let i = 0; i < 9; i++) {
                                          if (board[i] === null) {
                                                                board[i] = "X";
                                                                let score = this.minimax(board, depth + 1, true);
                                                                board[i] = null;
                                                                bestScore = Math.min(score, bestScore);
                                          }
                        }
                        return bestScore;
          }
    }
}
