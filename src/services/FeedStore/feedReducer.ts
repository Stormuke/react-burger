import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CloseReason, FeedInitial, WsActions, WsMessage } from 'types/types';

const initialState: FeedInitial = {
  wsOrders: {
    state: {
      error: null,
      closeReason: null,
      isConnected: false,
    },
    authState: {
      isAuthConnected: false,
      currentUserOrders: { total: 0, totalToday: 0, orders: [] },
    },
    orders: {
      orders: [],
      total: 0,
      totalToday: 0,
    },
  },
};

export const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    wsConnectionStart: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    wsSendMessage: () => {},
    wsConnectionSuccess: (state) => {
      state.wsOrders.state.error = null;
      state.wsOrders.state.closeReason = null;
      state.wsOrders.state.isConnected = true;
    },
    wsConnectionError: (state, { payload }: PayloadAction<string>) => {
      state.wsOrders.state.isConnected = false;
      state.wsOrders.state.error = payload;
    },
    wsConnectionClosed: (state, { payload }: PayloadAction<CloseReason>) => {
      state.wsOrders.state.isConnected = false;
      state.wsOrders.state.closeReason = payload;
    },
    wsGetMessage: (state, { payload }: PayloadAction<WsMessage>) => {
      state.wsOrders.orders = payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    wsAuthConnectionStart: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    wsAuthSendMessage: () => {},
    wsAuthConnectionSuccess: (state) => {
      state.wsOrders.authState.isAuthConnected = true;
    },
    wsAuthConnectionClosed: (
      state,
      { payload }: PayloadAction<CloseReason>,
    ) => {
      state.wsOrders.state.isConnected = false;
      state.wsOrders.state.closeReason = payload;
    },
    wsAuthGetMessage: (state, { payload }: PayloadAction<WsMessage>) => {
      state.wsOrders.authState.currentUserOrders.orders = payload.orders;
    },
  },
});

export const wsAction: WsActions = {
  onClose: slice.actions.wsConnectionClosed,
  onError: slice.actions.wsConnectionError,
  onMessage: slice.actions.wsGetMessage,
  onOpen: slice.actions.wsConnectionSuccess,
  wsInit: slice.actions.wsConnectionStart,
  wsSendMessage: slice.actions.wsSendMessage,
};

export const wsAuthActions: WsActions = {
  onClose: slice.actions.wsAuthConnectionClosed,
  onError: slice.actions.wsConnectionError,
  onMessage: slice.actions.wsAuthGetMessage,
  onOpen: slice.actions.wsAuthConnectionSuccess,
  wsInit: slice.actions.wsAuthConnectionStart,
  wsSendMessage: slice.actions.wsAuthSendMessage,
};
