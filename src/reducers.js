import C from './constants';
import _ from 'lodash';
import { combineReducers } from 'redux';

const ModalStackReducer = (state=[], action) => {
    switch (action.type) {
        case C.DUXPANEL_POP_STACK:
            if (state.length) {
                return state.slice(0, -1);
            } else {
                return state;
            }

        case C.DUXPANEL_PUSH_STACK:
            return [...state, action.payload];

        default:
            return state;
    }
};

const PanelsReducer = (state={}, action) => {
    switch (action.type) {
        case C.DUXPANEL_SET_DATA:
            let newState = _.cloneDeep(state);
            if (!newState.hasOwnProperty(action.name)) {
                newState[action.name] = action.payload;
            } else {
                newState[action.name] = _.assign(newState[action.name], action.payload);
            }
            return newState;

        default:
            return state;
    }
};

export const DuxPanelReducer = combineReducers({
    modalStack: ModalStackReducer,
    panels: PanelsReducer
});
