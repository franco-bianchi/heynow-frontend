import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
    name: 'auth',
    initialState: {
        allMessages: [],
    },
    reducers: {
        addAnswer: ( state, { payload } ) => {
            state.allMessages = state.allMessages.map(message => {
                if(!message.answer) {
                    message.answer = payload;
                }
                return message;
            })
        },
        addIntent: ( state, { payload } ) => {
            state.allMessages.push({intent: payload});
        },
        onReset: ( state ) => {
            state.allMessages = [];
        }
    }
});

export const { addAnswer, addIntent, onReset } = messagesSlice.actions;