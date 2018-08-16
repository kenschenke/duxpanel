import React from 'react';
import { DuxYesNoDialog } from '../../src/DuxYesNoDialog';

export class YesNoDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false
        };
    }

    onNo = () => {
        this.toggleDialog();
    };

    onYes = () => {
        this.toggleDialog();
    };

    toggleDialog = () => {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen
        });
    };

    render() {
        return (
            <div>
                <DuxYesNoDialog
                    show={this.state.isDialogOpen}
                    title="Yes No Dialog Title"
                    onYes={this.onYes}
                    onNo={this.onNo}
                    yesClassName="btn btn-warning"
                    noClassName="btn btn-primary"
                >
                    Are you sure you want to delete the record?
                </DuxYesNoDialog>

                <button type="button" className="btn btn-default" onClick={this.toggleDialog}>Open Dialog</button>
            </div>
        );
    }
}
