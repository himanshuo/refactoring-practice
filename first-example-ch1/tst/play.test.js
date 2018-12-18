const { Play } = require('../src/play/play');

test('can get name', () => {
    const playName = "aPlay";
    const sut = new Play(playName);
    expect(sut.getName()).toEqual(playName);
});

test('subclass must implement costCents', () => {
    const sut = new Play("aPlay");
    expect(() => {
        sut.costCents(5);
      }).toThrow(new Error("costCents not implemented"));
});

test('subclass must implement volumeCredits', () => {
    const sut = new Play("aPlay");
    expect(() => {
        sut.volumeCredits(5);
      }).toThrow(new Error("volumeCredits not implemented"));
});



