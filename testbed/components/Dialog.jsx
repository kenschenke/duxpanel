import React from 'react';
import DuxDialog from '../../src/DuxDialog';
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false
        };
    }

    onDialogButton = label => {
        alert(`${label} clicked (default handler)`);
    };

    onButton2Click = () => {
        alert('Button 2 clicked (Button 2 specific handler)');
    };

    toggleDialog = () => {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen
        });
    };

    render() {
        const icon = <FontAwesomeIcon icon={faInfoCircle} className="text-info" style={{fontSize:36}}/>;
        return (
            <div>
                <DuxDialog show={this.state.isDialogOpen}
                           onClose={this.toggleDialog}
                           title="Dialog title"
                           icon={icon}
                           onButton={this.onDialogButton}
                           allowClose={true}
                           onEscPressed={this.toggleDialog}
                           width={600}
                           buttonClassName="btn btn-primary"
                           buttons={[
                               'Button 1',
                               {
                                   label: 'Button 2',
                                   onClick: this.onButton2Click,
                                   className: 'btn btn-warning'
                               },
                               {
                                   label: 'Button Left',
                                   className: 'btn btn-danger',
                                   align: 'left'
                               },
                               <button
                                   key="Button 3"
                                   type="button"
                                   className="btn btn-success"
                                   style={{marginLeft:10, marginRight:10}}
                                   onClick={() => alert('Button 3 clicked')}
                               >Button 3</button>
                           ]}
                >
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras varius metus enim, sit amet feugiat enim pharetra at.
                    </p>
                    <p>
                        Click the 'x' or press Escape to close the dialog.
                    </p>
                </DuxDialog>

                <button type="button" className="btn btn-default" onClick={this.toggleDialog}>Open Dialog</button>
            </div>
        );
    }
}

