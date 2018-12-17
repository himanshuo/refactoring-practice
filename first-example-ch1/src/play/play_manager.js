import {Tragedy} from './tragedy';
import {Comedy} from './comedy';

/**
 * Manage Plays
 */
export class PlayManager {
/**
  *
  * @param {string} playsJson
  */
  constructor(playsJson) {
    // play-id -> Play
    this.plays = this.parseJson(playsJson);
  }

  /**
   * @param {String} playId
   * @return {Play} play for playId
   */
  getPlay(playId) {
    return this.plays[playId];
  }

  /**
   *
   * @param {json} playsJson
   * @return {object} object where key is playId and value is Play
   */
  parseJson(playsJson) {
    const plays = {}; // playId -> Play
    Object.entries(playsJson).forEach((entry) => {
      const playId = entry[0];
      const playType = entry[1].type;
      const playName = entry[1].name;
      plays[playId] = this.playForType(playType, playName);
    });
    return plays;
  }

  /**
   *
   * @param {string} playType
   * @param {string} playName
   * @return {Play}
   */
  playForType(playType, playName) {
    switch (playType) {
      case 'tragedy':
        return new Tragedy(playName);
      case 'comedy':
        return new Comedy(playName);
      default:
        throw new Error(`unknown type: ${playType}`);
    }
  }
}
