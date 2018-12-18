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
  cost(performance) {
    throw new Error('cost not implemented');
  }
}
