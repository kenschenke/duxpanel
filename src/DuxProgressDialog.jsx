import React from 'react';
import PropTypes from 'prop-types';
import { DuxDialog } from './DuxDialog';

export class DuxProgressDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // timerElapsed is true if the dialog is to display immediately (props.showAfter < 1).
            // Otherwise, it gets set to true when the timer counts down.
            timerElapsed: props.showAfter < 1
        };
    }

    componentDidUpdate = prevProps => {
        if (!prevProps.show && this.props.show) {
            // The dialog was hidden but is now to be shown.
            if (this.props.showAfter) {
                // The dialog is only to be shown after a timeout
                setTimeout(() => {
                    this.setState({timerElapsed:true});
                }, this.props.showAfter);
            }
        } else if (prevProps.show && !this.props.show && this.props.showAfter > 0) {
            // The dialog was being shown but is now hidden.  When the dialog is to be
            // re-displayed it is only after a timeout.
            this.setState({timerElapsed: false});
        }
    };

    render() {
        if (!this.props.show || !this.state.timerElapsed) {
            return null;
        }

        let buttons = null;
        if (this.props.allowAbort) {
            buttons = [{
                label: 'Abort',
                className: this.props.abortButtonClassName,
                onClick: this.props.onAbort
            }];
        }

        return (
            <DuxDialog {...this.props}
                    allowClose={false}
                    clickToDismiss={false}
                    buttons={buttons}
            >
                {this.props.children}
                { (this.props.min || this.props.max || this.props.value) && this.props.progressComponent &&
                React.createElement(this.props.progressComponent, {
                    min: this.props.min,
                    max: this.props.max,
                    value: this.props.value
                })
                }
            </DuxDialog>
        );
    }
}

DuxProgressDialog.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    allowAbort: PropTypes.bool,
    onAbort: PropTypes.func,
    showAfter: PropTypes.number,
    abortButtonClassName: PropTypes.string,
    progressComponent: PropTypes.func
};

DuxProgressDialog.defaultProps = {
    min: 0,
    max: 0,
    values: 0,
    allowAbort: false,
    showAfter: 0,
    abortButtonClassName: ''
};
