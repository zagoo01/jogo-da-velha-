import { Game } from "./game.js";
import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
        const game = new Game({
                onBoardUpdate: (cells, player) => ui.updateBoard(cells, player),
                        onWin: (jogador, linha) => ui.showWin(jogador, linha),
                                onDraw: () => ui.showDraw(),
                                        onTurnChange: (jogador) => ui.showTurn(jogador),
                                                onScoreUpdate: (jogadores, empates) => ui.updateScore(jogadores, empates),
                                                    });

                                                        ui.bindEvents({
                                                                onCellClick: (indice) => game.makeMove(indice),
                                                                        onRestart: () => game.restart(),
                                                                                onResetAll: () => game.resetAll(),
                                                                                        onModeChange: (aiEnabled) => {
                                                                                                    game.setAIMode(aiEnabled);
                                                                                                                ui.updateModeLabel(aiEnabled);
                                                                                                                        },
                                                                                                                            });
                                                                                                                            
                                                                                                                                ui.showTurn(game.currentPlayer);
                                                                                                                                    ui.updateScore(game.players, game.draws);
                                                                                                                                        ui.updateModeLabel(false);
                                                                                                                                        });
