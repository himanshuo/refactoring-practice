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
  getName() {
    return this.name;
  }

  /**
   *
   * @param {Number} audience
   */
  costCents(audience) {
    throw new Error('costCents not implemented');
  }

  /**
   *
   * @param {Number} audience
   */
  volumeCredits(audience) {
    throw new Error('volumeCredits not implemented');
  }
}
