/**
 * Utils - Funcoes auxiliares para verificar vencedor e estado do tabuleiro.
 */
export function checkWinner(cells) {
      const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
                [0, 4, 8], [2, 4, 6]             // Diagonais
            ];

    for (let pattern of winPatterns) {
              const [a, b, c] = pattern;
              if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                            return { winner: cells[a], line: pattern };
              }
    }
      return null;
}

export function isBoardFull(cells) {
      return cells.every(cell => cell !== null);
}
