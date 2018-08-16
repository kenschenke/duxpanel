import React from 'react';
import { DuxOkDialog } from '../../src/DuxOkDialog';

export class OkDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false
        };
    }

    onCancel = () => {
        this.toggleDialog();
    };

    onOk = () => {
        this.toggleDialog();
    };

    shouldClose = () => {
        return this._shouldClose.checked;
    };

    toggleDialog = () => {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen
        });
    };

    render() {
        return (
            <div>
                <DuxOkDialog
                    show={this.state.isDialogOpen}
                    title="Ok Dialog Title"
                    showCancel={true}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    shouldClose={this.shouldClose}
                    okClassName="btn btn-primary"
                    cancelClassName="btn btn-warning"
                >
                    I Agree: <input type="checkbox" ref={ref => this._shouldClose=ref}/>
                    <p>Your order is ready to submit.</p>
                </DuxOkDialog>

                <button type="button" className="btn btn-default" onClick={this.toggleDialog}>Open Dialog</button>
            </div>
        );
    }
}

