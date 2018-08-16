import { numberStrToNumber } from '../../src/helpers';

describe('numberStrToNumber tests', () => {
    test('float with non-essential characters', () => {
        const input = '  12.23  ';
        const expected = 12;
        const actual = numberStrToNumber(input);
        expect(actual).toEqual(expected);
    });

    test('integer', () => {
        const input = '1234';
        const expected = 1234;
        const actual = numberStrToNumber(input);
        expect(actual).toEqual(expected);
    });
});
