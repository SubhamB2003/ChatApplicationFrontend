import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    allUserList: [],
    userList: [],
    curUserChat: []
};

export const globalSlice = createSlice({
    name: "Global States",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.userList = [];
            state.curUserChat = [];
        },
        setUserList: (state, action) => {
            state.userList = action.payload.userList;
        },
        setAllUserList: (state, action) => {
            state.allUserList = action.payload.allUserList;
        },
        setCurUserChat: (state, action) => {
            state.curUserChat = action.payload.curUserChat;
        }
    }
});

export const { setLogin, setLogout, setUserList, setCurUserChat, setAllUserList } = globalSlice.actions;

export default globalSlice.reducer;