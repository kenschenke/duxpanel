import React from 'react';
import PropTypes from 'prop-types';

import { DuxDialog } from './DuxDialog';

export class DuxYesNoDialog extends React.Component {
    render() {
        let buttons = [
            {
                label: 'Yes',
                className: this.props.yesClassName,
                onClick: this.props.onYes
            },
            {
                label: 'No',
                className: this.props.noClassName,
                onClick: this.props.onNo
            }
        ];

        return (
            <DuxDialog {...this.props} buttons={buttons} onClose={this.props.onNo}>
                {this.props.children}
            </DuxDialog>
        );
    }
}

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
