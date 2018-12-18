import { PlayManager } from '../src/play/play_manager';
import { Comedy } from '../src/play/comedy';
import { Tragedy } from '../src/play/tragedy';

test('creates Comedy Play if type = comedy', () => {
    const playId = 'as-like';
    const playJson = {};
    playJson[playId] = {
            "name": "As You Like It",
            "type": "comedy"
    };
    const sut = new PlayManager(playJson);
    console.log(sut);
    expect(sut.getPlay(playId) instanceof Comedy).toBeTruthy();
});

test('creates Tragedy Play if type = tragedy', () => {
    const playId = 'hamlet';
    const playJson = {};
    playJson[playId] = {
            "name": "Hamlet",
            "type": "tragedy"
    };
    const sut = new PlayManager(playJson);
    expect(sut.getPlay(playId) instanceof Tragedy).toBeTruthy();
});

test('throws error if unknown type', () => {
    const playJson = {
        "hamlet": {
            "name": "Hamlet",
            "type": "fake"
        }
    };
    expect(() => {
        new PlayManager(playJson);
    }).toThrow(new Error('unknown type: fake'))
});