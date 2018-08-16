import React from 'react';
import PropTypes from 'prop-types';

import { DuxPanel } from './DuxPanel';
import { DialogButtonBar } from './DialogButtonBar';

export class DuxDialog extends React.Component {
    render() {
        let footer = null;
        if (this.props.buttons) {
            footer = <DialogButtonBar
                buttons={this.props.buttons}
                onButton={this.props.onButton}
                buttonClassName={this.props.buttonClassName}
            />;
        }
        return (
            <DuxPanel footerComponent={footer} {...this.props}>
                {this.props.icon &&
                <div style={{float:'left',marginRight:10}}>{this.props.icon}</div>
                }
                {this.props.children}
            </DuxPanel>
        );
    }
}

DuxDialog.propTypes = {
    ...DuxPanel.propTypes,
    buttons: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node])
    ),
    onButton: PropTypes.func,
    icon: PropTypes.node,
    buttonClassName: PropTypes.string
};

DuxDialog.defaultProps = {
    ...DuxPanel.defaultProps,
    footerBorder: true,
    allowClose: false,
    clickToDismiss: false,
    buttonClassName: '',
    top: 50,
    slideInFrom: 'top',
    slideOutTo: 'top'
};
