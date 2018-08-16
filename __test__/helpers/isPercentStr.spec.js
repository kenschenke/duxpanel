import { isPercentStr } from '../../src/helpers';

describe('isPercentStr tests', () => {
    test('not a string', () => {
        const input = 123;
        expect(isPercentStr(input)).toEqual(false);
    });

    test('non-essential characters', () => {
        const input = ' 1.23 %';
        expect(isPercentStr(input)).toEqual(true);
    });

    test('no percent sign', () => {
        const input = '1.23';
        expect(isPercentStr(input)).toEqual(false);
    });
});
