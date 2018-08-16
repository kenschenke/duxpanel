import { combineReducers } from 'redux';
import { DuxPanelReducer } from '../../src/reducers';

export default combineReducers({
    panels: DuxPanelReducer
});
