import React from 'react';
import PropTypes from 'prop-types';
import { getAnimationNameHide, getAnimationNameShow, getElementPosition, isInsideRect,
    propToPixels } from './helpers';

export class DuxPanel extends React.Component {
    constructor(props) {
        super(props);

        this._panel = null;
        this._header = null;
        this.btnDown = false;
        this.dragging = false;
        this.timestamp = 0;  // Used to uniquely identify the panel in the stack

        const initialState = {
            showInDOM: props.show,
            backdropAnimationName: '',
            animationName: props.show ? getAnimationNameShow(props) : ''
        };

        this.pos = {offsetX: 0, offsetY: 0};
        this.state = initialState;
    }

    addToModalStack = () => {
        if (this.props.modal && this.timestamp === 0) {
            // Record the timestamp to uniquely identify the panel in the view stack.
            const now = new Date();
            this.timestamp = now.getTime();

            DuxPanel.panelStack.push(this.timestamp);
        }
    };

    componentDidUpdate = prevProps => {
        if (!prevProps.show && this.props.show) {
            // The panel was hidden but is now visible.
            // Subscribe to the document's keydown event to listen for Escape and Enter.
            this.subscribeToEvents();
            this.addToModalStack();
            const newState = {
                showInDOM: true,
                animationName: getAnimationNameShow(this.props)
            };
            if (this.props.modal) {
                newState.backdropAnimationName = 'duxpanel-fade-in';
            }
            this.setState(newState);
        }
        else if (prevProps.show && !this.props.show) {
            // The panel was visible but is now hidden.  Unsubscribe from the
            // document's keydown event.
            document.removeEventListener('keydown', this.onKeyDown, false);
            window.removeEventListener('resize', this.windowResized, false);
            window.removeEventListener('mousemove', this.mouseMove, false);
            window.removeEventListener('mouseup', this.mouseUp, false);
            window.removeEventListener('mousedown', this.mouseDown, false);
            const animationNameHide = getAnimationNameHide(this.props);
            const newState = {};
            if (animationNameHide) {
                newState.animationName = animationNameHide;
                setTimeout(() => {this.setState({showInDOM:false})}, 250);
            } else {
                newState.showInDOM = false;
            }
            if (this.props.modal) {
                DuxPanel.panelStack.pop();
                this.timestamp = 0;
                newState.backdropAnimationName = 'duxpanel-fade-out';
            }
            this.setState(newState);
        }
    };

    mouseDown = event => {
        let x, y;

        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        if (this._header) {
            const headerRect = this._header.getBoundingClientRect();
            let curPos = getElementPosition(this._panel);
            if (isInsideRect(x, y, curPos.left, curPos.top, headerRect.width, headerRect.height)) {
                this.btnDown = true;
            }
        }
    };

    mouseMove = event => {
        let x, y;

        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        if (this.props.allowDrag) {
            if (this.btnDown) {
                if (!this.dragging) {
                    this.dragging = true;
                    // The user is starting to drag the panel by the header.
                    // Remember the mouse's relative position inside the
                    // panel.  As the panel is being dragged, the panel's
                    // top-left position is determined based on this offset.
                    let curPos = getElementPosition(this._panel);
                    this.pos.offsetX = x - curPos.left;
                    this.pos.offsetY = y - curPos.top;
                }

                x -= this.pos.offsetX;
                y -= this.pos.offsetY;

                // move the panel to the new position
                this._panel.style.left = `${x - document.body.scrollLeft - document.documentElement.scrollLeft}px`;
                this._panel.style.top = `${y - document.body.scrollTop - document.documentElement.scrollTop}px`;
            } else {
                this.dragging = false;
            }
        }
    };

    mouseUp = () => {
        this.btnDown = this.dragging = false;
    };

    onBackdropClick = () => {
        if (this.props.onClose()) {
            this.props.onClose();
        }
    };

    onKeyDown = event => {
        if (this.props.modal && DuxPanel.panelStack[DuxPanel.panelStack.length - 1] === this.timestamp) {
            if (this.props.onEscPressed && event.key === 'Escape') {
                this.props.onEscPressed();
            }
            if (this.props.onEnterPressed && event.key === 'Enter') {
                this.props.onEnterPressed();
            }
        }
    };

    panelRef = ref => {
        if (ref && this._panel !== ref) {

            this._panel = ref;
            this.updatePanelPosition();

            // If the panel is hard-wired to show at initialization,
            // subscribe to events and add it to the modal stack (if modal).
            // This is normally handled in componentDidUpdate() when the "show"
            // prop goes from false to true.  But, since "show" is already true,
            // that part of componentDidUpdate() will never execute.
            if (this.props.show) {
                this.subscribeToEvents();
                this.addToModalStack();
            }
        }
    };

    subscribeToEvents = () => {
        document.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('resize', this.windowResized, false);
        window.addEventListener('mousemove', this.mouseMove, false);
        window.addEventListener('mousedown', this.mouseDown, false);
        window.addEventListener('mouseup', this.mouseUp, false);
    };

    updatePanelPosition = () => {
        if (this._panel) {
            let x, y;
            if (this.props.center) {
                x = window.innerWidth / 2 - this._panel.offsetWidth / 2;
                y = window.innerHeight / 2 - this._panel.offsetHeight / 2;
                if (this.props.left) {
                    x = this.props.left;
                } else {
                    this._panel.style.left = `${x}px`;
                }
                if (this.props.top) {
                    y = this.props.top;
                } else {
                    this._panel.style.top = `${y}px`;
                }
            }
        }
    };

    windowResized = () => {
        // If left, top, width, or height is specified as anything
        // other than a number then the panel must be re-rendered.

        if (this.props.center) {
            this.updatePanelPosition();
        }

        if ((this.props.left && typeof this.props.left !== 'number') ||
            (this.props.top && typeof this.props.top !== 'number') ||
            (this.props.width && typeof this.props.width !== 'number') ||
            (this.props.height && typeof this.props.height !== 'number')) {
            this.forceUpdate();
        }
    };

    render() {
        // Render nothing if the "show" prop is false
        if (!this.state.showInDOM) {
            return null;
        }

        // Find this panel's position on the stack to determine the zIndex
        // value to cover panels at lower stack positions
        let panelDepth = 0;
        for (let i = 0; i < DuxPanel.panelStack.length; i++) {
            if (DuxPanel.panelStack[i] === this.timestamp) {
                panelDepth = i + 1;
            }
        }

        const panelStyle = {
            zIndex: 11 + panelDepth * 2
        };

        if (this.props.animation) {
            panelStyle.animation = this.props.animation;
        }
        else if (this.state.animationName) {
            panelStyle.animationDuration = '.25s';
            panelStyle.animationName = this.state.animationName;
            panelStyle.animationFillMode = 'forwards';
            setTimeout(() => {this.setState({animationName:''})}, 500);  // clear animation name for next render
        }

        if (this.props.left) panelStyle.left = propToPixels(this.props.left, window.innerWidth);
        if (this.props.top) panelStyle.top = propToPixels(this.props.top, window.innerHeight);
        if (this.props.width) panelStyle.width = propToPixels(this.props.width, window.innerWidth);
        if (this.props.height) panelStyle.height = propToPixels(this.props.height, window.innerHeight);

        const backdropStyle = {
            zIndex: 10 + panelDepth * 2,
            animation: this.state.backdropAnimationName ? `${this.state.backdropAnimationName} .25s ease-in-out 0s 1 normal forwards` : ''
        };

        return (
            <div>
                {this.props.modal &&
                    <div
                        className="duxpanel-backdrop"
                        style={backdropStyle}
                        onClick={this.props.clickToDismiss ? this.onBackdropClick : null}
                    >
                    </div>
                }
                <div className="duxpanel" style={panelStyle} ref={this.panelRef}>
                    {this.props.title &&
                        <div
                            ref={ref => {this._header = ref}}
                            className="duxpanel-heading"
                        >
                            {this.props.title}
                            {this.props.allowClose && this.props.onClose &&
                            <button type="button" className="duxpanel-close-button" onClick={this.props.onClose}>&times;</button>
                            }
                        </div>
                    }
                    <div className="duxpanel-body">
                        {this.props.children}
                    </div>
                    {this.props.footerComponent &&
                        <div className="duxpanel-footer">
                            {this.props.footerComponent}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

DuxPanel.propTypes = {
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    onClose: PropTypes.func,
    show: PropTypes.bool,
    allowClose: PropTypes.bool,
    allowDrag: PropTypes.bool,
    onEscPressed: PropTypes.func,
    onEnterPressed: PropTypes.func,
    modal: PropTypes.bool,
    clickToDismiss: PropTypes.bool,
    center: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
    footerComponent: PropTypes.node,
    slideInFrom: PropTypes.string,
    slideOutTo: PropTypes.string,
    fadeIn: PropTypes.bool,
    fadeOut: PropTypes.bool,
    animation: PropTypes.string
};

DuxPanel.panelStack = [];

DuxPanel.defaultProps = {
    modal: true,
    center: true,
    allowDrag: true,
    allowClose: true,
    clickToDismiss: true,
    slideInFrom: '',
    slideOutTo: '',
    fadeIn: true,
    fadeOut: true,
    animation: '',
    show: false
};
