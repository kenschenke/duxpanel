import React from 'react';
import { DuxPanel } from '../../src/DuxPanel';

export class PanelStack extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openPanels: 0
        };
        setTimeout(this.openPanel, 100);

        this.escapeElems = [null, null, null, null];
        this.enterElems = [null, null, null, null];
    }

    closePanel = () => {
        this.setState({openPanels: this.state.openPanels - 1});
    };

    enterPressed = num => {
        this.enterElems[num].style.display = 'block';
        setTimeout(() => {
            this.enterElems[num].style.display = 'none';
        }, 1000);
    };

    escapePressed = num => {
        this.escapeElems[num].style.display = 'block';
        setTimeout(() => {
            this.escapeElems[num].style.display = 'none';
        }, 1000);
    };

    openPanel = () => {
        if (this.state.openPanels >= 4) {
            return;
        }
        this.setState({openPanels: this.state.openPanels + 1});
        setTimeout(this.openPanel, 1000);
    };

    render() {
        return (
            <div>
                <DuxPanel
                    show={this.state.openPanels > 0}
                    title="First Panel"
                    onClose={this.closePanel}
                    onEnterPressed={() => {this.enterPressed(0)}}
                    onEscPressed={() => {this.escapePressed(0)}}
                    top="5%"
                    left="5%"
                    width="40%"
                    height="40%"
                >
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.enterElems[0]=ref}}>
                        Enter Pressed
                    </p>
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.escapeElems[0]=ref}}>
                        Escape Pressed
                    </p>
                </DuxPanel>

                <DuxPanel
                    show={this.state.openPanels > 1}
                    title="Second Panel"
                    onClose={this.closePanel}
                    onEnterPressed={() => {this.enterPressed(1)}}
                    onEscPressed={() => {this.escapePressed(1)}}
                    top="5%"
                    left="55%"
                    width="40%"
                    height="40%"
                >
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.enterElems[1]=ref}}>
                        Enter Pressed
                    </p>
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.escapeElems[1]=ref}}>
                        Escape Pressed
                    </p>
                </DuxPanel>

                <DuxPanel
                    show={this.state.openPanels > 2}
                    title="Third Panel"
                    onClose={this.closePanel}
                    onEnterPressed={() => {this.enterPressed(2)}}
                    onEscPressed={() => {this.escapePressed(2)}}
                    top="55%"
                    left="5%"
                    width="40%"
                    height="40%"
                >
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.enterElems[2]=ref}}>
                        Enter Pressed
                    </p>
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.escapeElems[2]=ref}}>
                        Escape Pressed
                    </p>
                </DuxPanel>

                <DuxPanel
                    show={this.state.openPanels > 3}
                    title="Fourth Panel"
                    onClose={this.closePanel}
                    onEnterPressed={() => {this.enterPressed(3)}}
                    onEscPressed={() => {this.escapePressed(3)}}
                    top="55%"
                    left="55%"
                    width="40%"
                    height="40%"
                >
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.enterElems[3]=ref}}>
                        Enter Pressed
                    </p>
                    <p className="text-primary" style={{display:'none'}} ref={ref => {this.escapeElems[3]=ref}}>
                        Escape Pressed
                    </p>
                </DuxPanel>
            </div>
        );
    }
}