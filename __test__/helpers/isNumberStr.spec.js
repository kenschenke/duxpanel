import { isNumberStr } from '../../src/helpers';

describe('isNumberStr tests', () => {
    test('not a string', () => {
        const input = 123;
        expect(isNumberStr(input)).toEqual(false);
    });

    test('string with non essential characters', () => {
        const input = ' 123.45  ';
        expect(isNumberStr(input)).toEqual(true);
    });

    test('string with px postfix', () => {
        const input = ' 123.45 px ';
        expect(isNumberStr(input)).toEqual(true);
    });
});
