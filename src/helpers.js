/**
 * This helper function is called from DuxPanel.  It looks at the properties and returns
 * the name of the CSS keyframe animation to use when the dialog hides.
 *
 * @param props
 * @returns {string}
 */
export const getAnimationNameHide = props => {
    let name = '';
    if (props.slideOutTo) {
        switch (props.slideOutTo) {
            case 'top': name = 'duxpanel-slide-out-top'; break;
            case 'right': name = 'duxpanel-slide-out-right'; break;
            case 'bottom': name = 'duxpanel-slide-out-bottom'; break;
            case 'left': name = 'duxpanel-slide-out-left'; break;
        }
    } else if (props.fadeOut) {
        name = 'duxpanel-fade-out';
    }

    return name;
};

/**
 * This helper function is called from DuxPanel.  It looks at the properties and returns
 * the name of the CSS keyframe animation to use when the dialog shows.
 *
 * @param props
 * @returns {string}
 */
export const getAnimationNameShow = props => {
    let name = '';
    if (props.slideInFrom) {
        switch (props.slideInFrom) {
            case 'top': name = 'duxpanel-slide-in-top'; break;
            case 'right': name = 'duxpanel-slide-in-right'; break;
            case 'bottom': name = 'duxpanel-slide-in-bottom'; break;
            case 'left': name = 'duxpanel-slide-in-left'; break;
        }
    } else if (props.fadeIn) {
        name = 'duxpanel-fade-in';
    }

    return name;
};

/**
 * Gets the offset position of the element.
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
const getElementOffset = elem => {
    if (elem === null || elem === undefined) {
        return {top: 0, left: 0};
    }

    const rect = elem.getBoundingClientRect();
    const win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left - win.pageXOffset
    };
};

/**
 * Gets the relative position of the element.
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
export const getElementPosition = elem => {
    const elemOffset = getElementOffset(elem);
    const parentOffset = getElementOffset(elem.offsetParent);

    return {
        top: elemOffset.top,
        left: elemOffset.left
    };
};

export const isInsideRect = (x, y, left, top, width, height) => {
    return (x >= left && y >= top && x <= left+width && y <= top+height);
};

/**
 * Returns true if the parameter is a string that contains a number.
 * @param value
 * @returns {boolean}
 */
const isNumberStr = value => {
    if (typeof value === 'string') {
        return value.indexOf('px') !== -1 || !isNaN(parseInt(value));
    }

    return false;
};

/**
 * Returns true if the parameter is a string that contains a percent.
 * @param value
 * @returns {boolean}
 */
const isPercentStr = value => {
    return typeof value === 'string' && value.indexOf('%') !== -1;
};

export const numberStrToNumber = value => {
    return Math.round(parseFloat(value.replace(/[^0-9.]/g, '')));
};

/**
 * This takes a percent string (i.e. "25%") and a reference dimension
 * and converts it to pixels.  Example: "25%" and 1000 would return 250.
 *
 * @param str
 * @param ref
 * @returns {number}
 */
export const percentStrToPixels = (str, ref) => {
    const pct = parseFloat(str.replace(/[^0-9.]/g, '')) / 100.0;
    return Math.round(ref * pct);
};

/**
 * This takes a number or a string and returns it in pixels.
 *
 * @param dimension
 * @param refDim
 * @returns {number}
 */
export const dimensionToPixels = (dimension, refDim) => {
    if (typeof dimension === 'number') {
        // actual pixels
        return Math.round(dimension);
    } else if (isPercentStr(dimension)) {
        // percent string (such as "25%")
        return percentStrToPixels(dimension, refDim);
    } else if (isNumberStr(dimension)) {
        return numberStrToNumber(dimension);
    } else {
        // Don't know what this is
        return dimension;
    }
};

/**
 * This function takes a dimension passed in as a property and returns the
 * actual pixels.  The first parameter is the dimension passed in as the property.
 * The second parameter is the reference dimension.  It's the viewport height if
 * the property is height or top.  It's the viewport width if the property is the
 * width or left.
 *
 * Dimension properties can be specified as one of the three:
 *    Number (actual pixels)
 *    String (percent string such as "25%")
 *    Object as follows:
 *    {
 *        xs: extra small devices (portrait phones, less than 576px)
 *        sm: small devices (landscape phones, 576px and up)
 *        md: medium devices (tablets, 768px and up)
 *        lg: large devices (desktops, 992px and up)
 *        xl: extra large devices (large desktops, 1200px and up)
 *    }
 *    If any size category is missing from the object, the category for the next smallest
 *    screen is used.
 *
 * @param prop - value passed as property for left, top, width, or height
 * @param refDim - reference dimension (viewport height for top and height, viewport width for left and width)
 */
export const propToPixels = (prop, refDim) => {
    if (typeof prop !== 'object') {
        return dimensionToPixels(prop, refDim);
    }

    // Return the largest dimension

    if (prop.hasOwnProperty('xl') && refDim >= 1200) {
        return dimensionToPixels(prop.xl, refDim);
    }

    if (prop.hasOwnProperty('lg') && refDim >= 992) {
        return dimensionToPixels(prop.lg, refDim);
    }

    if (prop.hasOwnProperty('md') && refDim >= 768) {
        return dimensionToPixels(prop.md, refDim);
    }

    if (prop.hasOwnProperty('sm') && refDim >= 576) {
        return dimensionToPixels(prop.sm, refDim);
    }

    if (prop.hasOwnProperty('xs')) {
        return dimensionToPixels(prop.xs, refDim);
    }

    // At this point, the user's browser is "xs" (< 576 pixels) but
    // no "xs" dimension was specified.  In this case, use the
    // lowest dimension in order of sm, md, lg, xl

    if (prop.hasOwnProperty('sm')) {
        return dimensionToPixels(prop.sm, refDim);
    }
    if (prop.hasOwnProperty('md')) {
        return dimensionToPixels(prop.md, refDim);
    }
    if (prop.hasOwnProperty('lg')) {
        return dimensionToPixels(prop.lg, refDim);
    }
    if (prop.hasOwnProperty('xl')) {
        return dimensionToPixels(prop.xl, refDim);
    }

    // Don't know how to handle this
    return prop;
};
