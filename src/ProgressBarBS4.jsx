import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarBS4 = className => props => {
    return (
        <div className="progress">
            <div className={className} style={{width:`${Math.round(((props.value-props.min)/(props.max-props.min))*100.)}%`}} aria-valuenow={props.value} aria-valuemin={props.min} aria-valuemax={props.max}></div>
        </div>
    );
};

ProgressBarBS4.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
};

export default ProgressBarBS4;
