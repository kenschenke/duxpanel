import React from 'react';
import DuxPanel from '../../src/DuxPanel';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

export class Animation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topPanelVisible: false,
            rightPanelVisible: false,
            bottomPanelVisible: false,
            leftPanelVisible: false,
            animPanelVisible: false,
            animFrame: 0  // 0 is starting position (centered), 1 is frame one, 2 is frame two
        };
    }

    toggleTopPanel = () => {
        this.setState({
            topPanelVisible: !this.state.topPanelVisible
        })
    };

    toggleRightPanel = () => {
        this.setState({
            rightPanelVisible: !this.state.rightPanelVisible
        })
    };

    toggleBottomPanel = () => {
        this.setState({
            bottomPanelVisible: !this.state.bottomPanelVisible
        })
    };

    toggleLeftPanel = () => {
        this.setState({
            leftPanelVisible: !this.state.leftPanelVisible
        })
    };

    toggleAnimPanel = () => {
        this.setState({
            animPanelVisible: !this.state.animPanelVisible,
            animFrame: 0
        });
    };

    toggleAnimFrame = () => {
        let nextFrame = this.state.animFrame + 1;
        if (nextFrame > 2) {
            nextFrame = 0;
        }
        this.setState({
            animFrame: nextFrame
        });
    };

    render() {
        let animFrameName = '';
        let animContent = 'This panel is animated.  Dragging is possible right now.';
        switch (this.state.animFrame) {
            case 1:
                animFrameName = 'panel-frame-one';
                animContent = 'Panel completed animation keyframe one.  Dragging is not possible.';
                break;
            case 2:
                animFrameName = 'panel-frame-two';
                animContent = 'Panel completed animation keyframe two.  Dragging is not possible.';
                break;
        }
        if (animFrameName) {
            animFrameName += ' .5s ease-in-out 0s 1 normal forwards';
        }

        const animationCss = `
@keyframes panel-frame-one {
    0% {
        left: 50px;
        top: 150px;
        width: 250px;
        height: 325px;
    }
    100% {
        left: 550px;
        top: 350px;
        width: 400px;
        height: 200px;
    }
}

@keyframes panel-frame-two {
    0% {
        left: 550px;
        top: 350px;
        width: 400px;
        height: 200px;
    }
    100% {
        left: 50px;
        top: 150px;
        width: 250px;
        height: 325px;
    }
}
        `;

        return (
            <div style={{paddingBottom:25}}>
                <h4>Demonstration of Entry and Exit Animations</h4>

                <div>
                    <button type="button" className="btn btn-secondary mr-3" onClick={this.toggleTopPanel}>Sliding From Top</button>
                    <button type="button" className="btn btn-secondary mr-3" onClick={this.toggleRightPanel}>Sliding From Right</button>
                    <button type="button" className="btn btn-secondary mr-3" onClick={this.toggleBottomPanel}>Sliding From Bottom</button>
                    <button type="button" className="btn btn-secondary mr-3" onClick={this.toggleLeftPanel}>Sliding From Left</button>
                </div>

                <DuxPanel
                    show={this.state.topPanelVisible}
                    title="DuxPanel Animation Demo"
                    showClose={true}
                    onClose={this.toggleTopPanel}
                    slideInFrom="top"
                    slideOutTo="top"
                    allowDrag={true}
                    width="50%"
                    height="50%"
                    top="5%"
                >
                    <p>This panel slides down from the top</p>
                </DuxPanel>

                <DuxPanel
                    show={this.state.rightPanelVisible}
                    title="DuxPanel Animation Demo"
                    showClose={true}
                    onClose={this.toggleRightPanel}
                    slideInFrom="right"
                    slideOutTo="right"
                    allowDrag={true}
                    width="50%"
                    height="50%"
                    left="45%"
                >
                    <p>This panel slides in from the right</p>
                </DuxPanel>

                <DuxPanel
                    show={this.state.bottomPanelVisible}
                    title="DuxPanel Animation Demo"
                    showClose={true}
                    onClose={this.toggleBottomPanel}
                    slideInFrom="bottom"
                    slideOutTo="bottom"
                    allowDrag={true}
                    width="50%"
                    height="50%"
                    top="45%"
                >
                    <p>This panel slides up from the bottom</p>
                </DuxPanel>

                <DuxPanel
                    show={this.state.leftPanelVisible}
                    title="DuxPanel Animation Demo"
                    showClose={true}
                    onClose={this.toggleLeftPanel}
                    slideInFrom="left"
                    slideOutTo="left"
                    allowDrag={true}
                    width="50%"
                    height="50%"
                    left="5%"
                >
                    <p>This panel slides in from the left</p>
                </DuxPanel>

                <h4 style={{marginTop:50}}>Demonstration of CSS Animation</h4>

                <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={this.state.animPanelVisible}
                    onClick={this.toggleAnimPanel}
                >
                    Open Panel In Starting Position
                </button>

                <DuxPanel
                    show={this.state.animPanelVisible}
                    title="DuxPanel Animation Demo"
                    showClose={true}
                    onClose={this.toggleAnimPanel}
                    allowDrag={true}
                    width="25%"
                    height="25%"
                    center={true}
                    animation={animFrameName}
                >
                    <p>{animContent}  Click the Animate button to continue.</p>

                    <button type="button" className="btn btn-primary" onClick={this.toggleAnimFrame}>Animate</button>
                </DuxPanel>

                <div className="alert alert-info mt-3">
                    Click the first button to open the panel centered in the browser window.  In this starting position,
                    dragging the window is possible.  Clicking the Animate button cycles through three positions: the
                    starting position, and two animation keyframes.  When the panel has completed one of these two
                    keyframes, dragging is not possible since the <code>animation</code> property of
                    the <code>DuxPanel</code> contains contents.  Clicking the Animate button after the panel has completed
                    keyframe two returns the panel back to a non-animated state, allowing dragging to happen again.
                </div>

                <h4>Example CSS</h4>

                <SyntaxHighlighter language="css" style={agate}>
                    {animationCss}
                </SyntaxHighlighter>

            </div>
        );
    }
}
