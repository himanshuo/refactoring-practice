import { Tragedy } from '../src/play/tragedy';

test('costCents adds a bonus if audience size is above 30 threshold', () => {
    const audience = 31;
    const sut = new Tragedy('aTragedy');
    expect(sut.costCents(audience)).toEqual(41000);
});

test('costCents does not add a bonus if audience size is less than 30 threshold', () => {
    const audience = 30;
    const sut = new Tragedy('aTragedy');
    expect(sut.costCents(audience)).toEqual(40000);
});