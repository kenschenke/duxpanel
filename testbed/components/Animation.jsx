import React from 'react';
import { DuxPanel } from '../../src/DuxPanel';

export class Animation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animationLevel: -1,
            animation: ''
        };
    }

    toggleAnimation = () => {
        let newLevel;
        switch (this.state.animationLevel) {
            case -1: newLevel = 0; break;
            case 0: newLevel = 1; break;
            case 1: newLevel = 0; break;
        }
        this.setState({
            animationLevel: newLevel,
            animation: (newLevel === 0 ? 'panel-one' : 'panel-two') + ' .5s ease-in-out 0s 1 normal forwards'
        });
    };

    render() {
        return (
            <div>
                <DuxPanel show={true}
                          title="Animated Panel"
                          allowClose={false}
                          modal={false}
                          allowDrag={false}
                          clickToDismiss={false}
                          center={true}
                          onClose={() => {}}
                          animation={this.state.animation}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis mauris diam, at maximus eros.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis mauris diam, at maximus eros.</p>
                </DuxPanel>

                <button type="button" className="btn btn-default" onClick={this.toggleAnimation}>Toggle Animation</button>
            </div>
        );
    }
}
