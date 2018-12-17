import  { Comedy } from '../src/play/comedy';

test('costCents adds a bonus if audience size is above 20 threshold', () => {
    const audience = 21;
    const sut = new Comedy('aComedy');
    expect(sut.costCents(audience)).toEqual(46800);
});

test('costCents does not add a bonus if audience size is less than 20 threshold', () => {
    const audience = 20;
    const sut = new Comedy('aComedy');
    expect(sut.costCents(audience)).toEqual(36000);
});