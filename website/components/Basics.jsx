import React from 'react';
import { DuxPanel } from '../../src/DuxPanel';

export class Basics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isOpen: false};
    }

    togglePanel = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        return (
            <div>
                <button type="button" className="btn btn-secondary" onClick={this.togglePanel}>Open Panel</button>

                <DuxPanel show={this.state.isOpen} title="Basic DuxPanel" width={400} height={300} onClose={this.togglePanel}>
                    <p>This is a basic DuxPanel</p>
                </DuxPanel>
            </div>
        );
    }
}
