import React from 'react';
import PropTypes from 'prop-types';

import { DuxDialog } from './DuxDialog';

export class DuxOkDialog extends React.Component {
    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    };

    onOk = () => {
        if (this.props.onOk) {
            if (this.props.shouldClose && !this.props.shouldClose()) {
                return;
            }
            this.props.onOk();
        }
    };

    render() {
        const buttons = [
            {
                label: 'Ok',
                onClick: this.onOk,
                className: this.props.okClassName,
                disabled: this.props.okDisabled
            }
        ];

        if (this.props.showCancel) {
            buttons.push({
                label: 'Cancel',
                onClick: this.onCancel,
                className: this.props.cancelClassName
            });
        }

        return (
            <DuxDialog
                {...this.props}
                buttons={buttons}
                onClose={this.onCancel}
                onEscPressed={() => {if (this.props.allowEsc) this.onCancel()}}
                onEnterPressed={() => {if (this.props.allowEnter) this.onOk()}}
            >
                {this.props.children}
            </DuxDialog>
        );
    }
}

DuxOkDialog.propTypes = {
    ...DuxDialog.propTypes,
    showCancel: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    allowEsc: PropTypes.bool,
    allowEnter: PropTypes.bool,
    buttons: PropTypes.array,
    shouldClose: PropTypes.func,
    cancelClassName: PropTypes.string,
    okClassName: PropTypes.string,
    okDisabled: PropTypes.bool
};

DuxOkDialog.defaultProps = {
    ...DuxDialog.defaultProps,
    showCancel: false,
    allowClose: true,
    allowEsc: true,
    allowEnter: true,
    cancelClassName: '',
    okClassName: '',
    okDisabled: false
};
