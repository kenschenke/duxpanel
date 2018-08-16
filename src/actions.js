import C from './constants';

export const pushPanelToStack = timestamp =>
    ({
        type: C.DUXPANEL_PUSH_STACK,
        payload: timestamp
    });

export const popPanelFromStack = () =>
    ({
        type: C.DUXPANEL_POP_STACK
    });
