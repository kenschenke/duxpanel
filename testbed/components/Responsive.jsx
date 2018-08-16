import React from 'react';
import { DuxPanel } from '../../src/DuxPanel';

export class Responsive extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPanelOpen: false,
            width: '50%'
        };
    }

    togglePanel = () => {
        this.setState({
            isPanelOpen: !this.state.isPanelOpen
        });
    };

    render() {
        return (
            <div>
                <DuxPanel show={this.state.isPanelOpen}
                          title="Responsive Panel"
                          allowClose={true}
                          modal={false}
                          allowDrag={true}
                          clickToDismiss={false}
                          center={false}
                          width={this.state.width}
                          left="25%"
                          top={50}
                          onClose={this.togglePanel}
                          slideInFrom="top"
                          fadeIn={true}
                          slideOutTo="top"
                          fadeOut={true}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis mauris diam, at maximus eros.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis mauris diam, at maximus eros.</p>
                </DuxPanel>

                <button type="button" className="btn btn-default" onClick={this.togglePanel}>Show Panel</button>
            </div>
        );
    }
}
