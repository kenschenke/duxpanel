import { dimensionToPixels } from '../../src/helpers';

describe('dimensionToPixels tests', () => {
    test('number', () => {
        const input = 123.78;
        const expected = 124;
        const reference = 1000;
        const actual = dimensionToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('number string', () => {
        const input = '123.78px';
        const expected = 124;
        const reference = 1000;
        const actual = dimensionToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('percent string', () => {
        const input = '12.5%';
        const expected = 125;
        const reference = 1000;
        const actual = dimensionToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('unrecognized input', () => {
        const input = new Date();
        const expected = input;
        const reference = 1000;
        const actual = dimensionToPixels(input, reference);
        expect(actual).toEqual(expected);
    });
});
