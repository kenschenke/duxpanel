import { percentStrToPixels } from '../../src/helpers';

describe('percentStrToPixels tests', () => {
    test('whitespace and other non-essential characters', () => {
        const input = "  25.0 % ";
        const reference = 1000;
        const expectedResult = 250;
        const actualResult = percentStrToPixels(input, reference);
        expect(actualResult).toEqual(expectedResult);
    });

    test('fractional percent', () => {
        const input = "50.5%";
        const reference = 1000;
        const expectedResult = 505;
        const actualResult = percentStrToPixels(input, reference);
        expect(actualResult).toEqual(expectedResult);
    });

    test('whole percent', () => {
        const input = "75%";
        const reference = 1000;
        const expectedResult = 750;
        const actualResult = percentStrToPixels(input, reference);
        expect(actualResult).toEqual(expectedResult);
    });
});
