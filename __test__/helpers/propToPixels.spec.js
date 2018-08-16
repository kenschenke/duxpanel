import { propToPixels } from '../../src/helpers';

describe('propToPixels tests', () => {
    test('number', () => {
        const input = 123.75;
        const expected = 124;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('number string', () => {
        const input = '123.75px';
        const expected = 124;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('percent string', () => {
        const input = '23.8%';
        const expected = 238;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra small number', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: 425, xl: 525};
        const expected = 125;
        const reference = 500;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra small percent', () => {
        const input = {xs: '80%', sm: 225, md: 325, lg: 425, xl: 525};
        const expected = 400;
        const reference = 500;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('small number', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: 425, xl: 525};
        const expected = 225;
        const reference = 600;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('small percent', () => {
        const input = {xs: 125, sm: '75%', md: 325, lg: 425, xl: 525};
        const expected = 450;
        const reference = 600;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('medium number', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: 425, xl: 525};
        const expected = 325;
        const reference = 800;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('medium percent', () => {
        const input = {xs: 125, sm: 225, md: '40%', lg: 425, xl: 525};
        const expected = 320;
        const reference = 800;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('large number', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: 425, xl: 525};
        const expected = 425;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('large percent', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: '57.5%', xl: 525};
        const expected = 575;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra large number', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: 425, xl: 525};
        const expected = 525;
        const reference = 1400;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra large percent', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: 425, xl: '60.5%'};
        const expected = 847;
        const reference = 1400;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('small fallback to xs', () => {
        const input = {xs: 125, md: 325, lg: 425, xl: 525};
        const expected = 125;
        const reference = 600;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('medium fallback to sm', () => {
        const input = {xs: 125, sm: 225, lg: 425, xl: 525};
        const expected = 225;
        const reference = 800;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('medium fallback to xs', () => {
        const input = {xs: 125, lg: 425, xl: 525};
        const expected = 125;
        const reference = 800;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('large fallback to md', () => {
        const input = {xs: 125, sm: 225, md: 325, xl: 525};
        const expected = 325;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('large fallback to sm', () => {
        const input = {xs: 125, sm: 225, xl: 525};
        const expected = 225;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('large fallback to xs', () => {
        const input = {xs: 125, xl: 525};
        const expected = 125;
        const reference = 1000;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra large fallback to lg', () => {
        const input = {xs: 125, sm: 225, md: 325, lg: 425};
        const expected = 425;
        const reference = 1400;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra large fallback to md', () => {
        const input = {xs: 125, sm: 225, md: 325};
        const expected = 325;
        const reference = 1400;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra large fallback to sm', () => {
        const input = {xs: 125, sm: 225};
        const expected = 225;
        const reference = 1400;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra large fallback to xs', () => {
        const input = {xs: 125};
        const expected = 125;
        const reference = 1400;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra small with fallback to sm', () => {
        const input = {sm: 225, md: 325, lg: 425, xl: 525};
        const expected = 225;
        const reference = 500;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra small with fallback to md', () => {
        const input = {md: 325, lg: 425, xl: 525};
        const expected = 325;
        const reference = 500;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra small with fallback to lg', () => {
        const input = {lg: 425, xl: 525};
        const expected = 425;
        const reference = 500;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });

    test('extra small with fallback to xl', () => {
        const input = {xl: 525};
        const expected = 525;
        const reference = 500;
        const actual = propToPixels(input, reference);
        expect(actual).toEqual(expected);
    });
});
