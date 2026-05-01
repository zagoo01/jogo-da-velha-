/**
 * UI Controller - Gerencia o DOM, eventos de clique e atualizacoes visuais.
 */
export class UI {
      constructor() {
                this.cells = document.querySelectorAll("[data-cell]");
                this.statusText = document.getElementById("status");
                this.scoreX = document.getElementById("scoreX");
                this.scoreO = document.getElementById("scoreO");
                this.draws = document.getElementById("draws");
                this.restartBtn = document.getElementById("restart");
                this.resetAllBtn = document.getElementById("resetAll");
                this.aiToggle = document.getElementById("aiToggle");
                this.modeLabel = document.getElementById("modeLabel");
      }

    bindEvents(callbacks) {
              this.cells.forEach((cell, index) => {
                            cell.addEventListener("click", () => callbacks.onCellClick(index));
              });

          this.restartBtn.addEventListener("click", callbacks.onRestart);
              this.resetAllBtn.addEventListener("click", callbacks.onResetAll);
              this.aiToggle.addEventListener("change", (e) => callbacks.onModeChange(e.target.checked));
    }

    updateBoard(cells, lastPlayer) {
              cells.forEach((val, i) => {
                            this.cells[i].textContent = val;
                            this.cells[i].className = "cell" + (val ? ` ${val.toLowerCase()}` : "");
                            this.cells[i].classList.remove("winner");
              });
    }

    showWin(player, line) {
              this.statusText.textContent = `Jogador ${player} venceu!`;
              line.forEach(index => this.cells[index].classList.add("winner"));
    }

    showDraw() {
              this.statusText.textContent = "Empate!";
    }

    showTurn(player) {
              this.statusText.textContent = `Turno do Jogador ${player}`;
    }

    updateScore(players, draws) {
              this.scoreX.textContent = players.X.score;
              this.scoreO.textContent = players.O.score;
              this.draws.textContent = draws;
    }

    updateModeLabel(aiEnabled) {
              this.modeLabel.textContent = aiEnabled ? "Modo: IA Ativada" : "Modo: Humano vs Humano";
    }
}
