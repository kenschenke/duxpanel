import React from 'react';
import PropTypes from 'prop-types';

export class DialogButtonBar extends React.Component {
    onButton = label => {
        if (this.props.onButton) {
            this.props.onButton(label);
        }
    };

    render() {
        const defaultOnClick = this.onButton;
        let leftButtons = [], rightButtons = [];
        for (let i = 0; i < this.props.buttons.length; i++) {
            let alignRight = true;
            let disabled = false;
            let label, type='button', onClick, className = this.props.buttonClassName;
            if (typeof this.props.buttons[i] === 'string') {
                label = this.props.buttons[i];
                onClick = defaultOnClick;
            } else if (React.isValidElement(this.props.buttons[i])) {
                rightButtons.push(this.props.buttons[i]);
            } else if (typeof this.props.buttons[i] === 'object') {
                label = this.props.buttons[i].label;
                onClick = this.props.buttons[i].onClick ? this.props.buttons[i].onClick : defaultOnClick;
                if (this.props.buttons[i].className) {
                    className = this.props.buttons[i].className;
                }
                if (this.props.buttons[i].type) {
                    type = this.props.buttons[i].type;
                }
                if (this.props.buttons[i].align && this.props.buttons[i].align === 'left') {
                    alignRight = false;
                }
                if (this.props.buttons[i].disabled) {
                    disabled = true;
                }
            }
            if (label !== undefined) {
                const button = <button
                    key={label}
                    className={className}
                    style={{marginLeft: 10, marginRight: 10}}
                    onClick={() => onClick(label)}
                    disabled={disabled}
                >{label}</button>
                if (alignRight) {
                    rightButtons.push(button);
                } else {
                    leftButtons.push(button);
                }
            }
        }

        return (
            <div className="duxdialogbuttonbar clearfix">
                <div style={{width:'100%'}}>
                    <div style={{float:'left'}}>
                        <span className={this.props.statusMsgClassName}>
                            {this.props.statusMsg}
                        </span>
                        {leftButtons}
                    </div>
                    <div style={{float:'right'}}>
                        {rightButtons}
                    </div>
                </div>
            </div>
        );
    }
}

DialogButtonBar.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node])).isRequired,
    onButton: PropTypes.func,
    buttonClassName: PropTypes.string.isRequired,
    statusMsg: PropTypes.string,
    statusMsgClassName: PropTypes.string
};

DialogButtonBar.defaultProps = {
    buttonClassName: '',
    statusMsg: '',
    statusMsgClassName: ''
};
