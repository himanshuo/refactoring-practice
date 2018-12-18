/**
 * Play
 */
export class Play {
  /**
   * @param {String} playName
   */
  constructor(playName) {
    this.name = playName;
  }

  /**
   * Get the name of the play
   * @return {String} name of the play
   */
  name() {
    return this.name;
  }

  /**
   *
   * @param {Performance} performance
   */
  costCents(performance) {
    throw new Error('costCents not implemented');
  }
}
