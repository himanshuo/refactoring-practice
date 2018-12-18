/**
 * Performance is a single performance of a play
 */
export class Performance {
  /**
     * A Performance must link to a Play.
     * A specific performance has some number of audience members.
     * @param {Play} play
     * @param {Number} audience
     */
  constructor(play, audience) {
    this.play = play;
    this.audience = audience;
  }

  /**
   * @return {Number} cost of this performance (in cents)
   */
  costCents() {
    return this.getPlay().costCents(this.getAudience());
  }

  /**
   * @return {Number} volume credits recieved due to size of audience
   */
  volumeCredits() {
    return this.getPlay().volumeCredits(this.getAudience());
  }

  /**
   * @return {Number}
   */
  getAudience() {
    return this.audience;
  }

  /**
   * @return {Play}
   */
  getPlay() {
    return this.play;
  }
}
