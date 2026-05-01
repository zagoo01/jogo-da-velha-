/**
 * Board Component - Representa o estado do tabuleiro 3x3.
  */
  export class Board {
      constructor() {
              this.cells = Array(9).fill(null);
                  }

                      get(index) {
                              return this.cells[index];
                                  }

                                      set(index, value) {
                                              this.cells[index] = value;
                                                  }

                                                      reset() {
                                                              this.cells = Array(9).fill(null);
                                                                  }
                                                                  }
