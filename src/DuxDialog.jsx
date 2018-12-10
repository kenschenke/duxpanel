import React from 'react';
import PropTypes from 'prop-types';

import { DuxPanel } from './DuxPanel';
import { DialogButtonBar } from './DialogButtonBar';

export const DuxDialog = props => {
    let footer = null;
    if (props.buttons) {
        footer = <DialogButtonBar
            buttons={props.buttons}
            onButton={props.onButton}
            buttonClassName={props.buttonClassName}
            statusMsg={props.statusMsg}
            statusMsgClassName={props.statusMsgClassName}
        />;
    }

    return (
        <DuxPanel footerComponent={footer} {...props}>
            {props.icon &&
            <div style={{float:'left',marginRight:10}}>{props.icon}</div>
            }
            {props.children}
        </DuxPanel>
    );
};

DuxDialog.propTypes = {
    ...DuxPanel.propTypes,
    buttons: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node])
    ),
    onButton: PropTypes.func,
    icon: PropTypes.node,
    buttonClassName: PropTypes.string,
    statusMsg: PropTypes.string,
    statusMsgClassName: PropTypes.string
};

DuxDialog.defaultProps = {
    ...DuxPanel.defaultProps,
    footerBorder: true,
    allowClose: false,
    clickToDismiss: false,
    buttonClassName: '',
    top: 50,
    slideInFrom: 'top',
    slideOutTo: 'top',
    statusMsg: '',
    statusMsgClassName: ''
};
