import { Board } from "./board.js";
import { Player } from "./player.js";
import { AI } from "./ai.js";
import { checkWinner, isBoardFull } from "./utils.js";

export class Game {
      constructor(callbacks) {
                this.callbacks = callbacks;
                this.board = new Board();
                this.players = {
                              X: new Player("X", "Jogador X"),
                              O: new Player("O", "Jogador O")
                };
                this.draws = 0;
                this.currentPlayer = "X";
                this.isGameOver = false;
                this.ai = new AI();
                this.aiEnabled = false;
      }

    setAIMode(enabled) {
              this.aiEnabled = enabled;
              this.players.O.name = enabled ? "IA (FADAP Bot)" : "Jogador O";
              this.players.O.isAI = enabled;
              this.restart();
    }

    makeMove(index) {
              if (this.isGameOver || this.board.get(index)) return;

          this.board.set(index, this.currentPlayer);
              this.callbacks.onBoardUpdate(this.board.cells, this.currentPlayer);
              this.checkGameState();

          if (!this.isGameOver && this.aiEnabled && this.currentPlayer === "O") {
                        setTimeout(() => this.makeAIMove(), 500);
          }
    }

    makeAIMove() {
              if (this.isGameOver) return;
              const bestMove = this.ai.getBestMove(this.board.cells);
              this.makeMove(bestMove);
    }

    checkGameState() {
              const winResult = checkWinner(this.board.cells);

          if (winResult) {
                        this.isGameOver = true;
                        this.players[winResult.winner].score++;
                        this.callbacks.onWin(winResult.winner, winResult.line);
                        this.callbacks.onScoreUpdate(this.players, this.draws);
                        return;
          }

          if (isBoardFull(this.board.cells)) {
                        this.isGameOver = true;
                        this.draws++;
                        this.callbacks.onDraw();
                        this.callbacks.onScoreUpdate(this.players, this.draws);
                        return;
          }

          this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
              this.callbacks.onTurnChange(this.currentPlayer);
    }

    restart() {
              this.board.reset();
              this.currentPlayer = "X";
              this.isGameOver = false;
              this.callbacks.onBoardUpdate(this.board.cells, null);
              this.callbacks.onTurnChange(this.currentPlayer);
    }

    resetAll() {
              this.players.X.score = 0;
              this.players.O.score = 0;
              this.draws = 0;
              this.callbacks.onScoreUpdate(this.players, this.draws);
              this.restart();
    }
}
