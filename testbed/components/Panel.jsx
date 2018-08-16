import React from 'react';
import { DuxPanel } from '../../src/DuxPanel';

export class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPanelOpen: false,
            allowClose: true,
            modal: true,
            allowDrag: true,
            clickToDismiss: true,
            center: true
        };
    }

    togglePanel = () => {
        this.setState({
            isPanelOpen: !this.state.isPanelOpen
        });
    };

    toggleAllowClose = () => {
        this.setState({
            allowClose: !this.state.allowClose
        });
    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    toggleAllowDrag  = () => {
        this.setState({
            allowDrag: !this.state.allowDrag
        });
    };

    toggleClickToDismiss = () => {
        this.setState({
            clickToDismiss: !this.state.clickToDismiss
        });
    };

    toggleCenter = () => {
        this.setState({
            center: !this.state.center
        });
    };

    render() {
        return (
            <div>
                <DuxPanel show={this.state.isPanelOpen}
                       onClose={this.togglePanel}
                       title="Panel Title"
                       allowClose={this.state.allowClose}
                       modal={this.state.modal}
                       allowDrag={this.state.allowDrag}
                       clickToDismiss={this.state.clickToDismiss}
                       center={this.state.center}
                       onEscPressed={this.togglePanel}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis mauris diam, at maximus eros.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis mauris diam, at maximus eros.</p>
                </DuxPanel>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" defaultChecked={this.state.allowClose} onClick={this.toggleAllowClose}/> Allow Close
                    </label>
                </div>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" defaultChecked={this.state.modal} onClick={this.toggleModal}/> Modal
                    </label>
                </div>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" defaultChecked={this.state.allowDrag} onClick={this.toggleAllowDrag}/> Allow Drag
                    </label>
                </div>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" defaultChecked={this.state.clickToDismiss} onClick={this.toggleClickToDismiss}/> Click to Dismiss
                    </label>
                </div>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" defaultChecked={this.state.center} onClick={this.toggleCenter}/> Center
                    </label>
                </div>

                <button type="button" className="btn btn-default" onClick={this.togglePanel}>Show Panel</button>
            </div>
        );
    }
}

