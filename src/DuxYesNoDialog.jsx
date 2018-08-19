import React from 'react';
import PropTypes from 'prop-types';

import { DuxDialog } from './DuxDialog';

export const DuxYesNoDialog = props => {
    let buttons = [
        {
            label: 'Yes',
            className: props.yesClassName,
            onClick: props.onYes
        },
        {
            label: 'No',
            className: props.noClassName,
            onClick: props.onNo
        }
    ];

    return (
        <DuxDialog {...props} buttons={buttons} onClose={props.onNo}>
            {props.children}
        </DuxDialog>
    );
};

DuxYesNoDialog.propTypes = {
    ...DuxDialog.propTypes,
    onYes: PropTypes.func.isRequired,
    onNo: PropTypes.func.isRequired,
    yesClassName: PropTypes.string,
    noClassName: PropTypes.string
};

DuxYesNoDialog.defaultProps = {
    yesClassName: '',
    noClassName: ''
};
