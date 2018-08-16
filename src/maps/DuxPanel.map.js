import { popPanelFromStack, pushPanelToStack } from '../actions';
import { propToPixels } from '../helpers';

export const mapPanelProps = (state, props) => {
    return {
        panelStack: state.panels.modalStack
    };
};

export const mapPanelDispatch = dispatch => {
    return {
        pushPanel(timestamp) {
            dispatch(pushPanelToStack(timestamp));
        },

        popPanel() {
            dispatch(popPanelFromStack());
        },

        propToPixels(prop, refDim) {
            return propToPixels(prop, refDim);
        }
    };
};
