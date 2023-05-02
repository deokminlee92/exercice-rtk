import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
// 유저 내용
import { addUser } from "../thunks/addUser";
// 삭제
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
  // Async Thunk 가 요청을 받아서 액션 디스패치로 뿌려주고 이걸 Redux Store가 받아서 dispatch-Reducers를 거쳐서 결과를 보여줌
  // User Loads app - state가 요청이 들어올 때마다 작동하고 있음을 알아야함
  // Request 들어올 때 isLoading의 상태가 true -> false 로 변하고
  // 요청 성공시에는 data에 데이터를 전송해주고 실패시에는 error에 담아서 보내줌
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    // 세개의 요청을 관리 + reducer 추가 (state,action)
    // 1. fetchUsers.pending === 'users/fetch/pending'
    builder.addCase(fetchUsers.pending, (state, action) => {
      // update our state object however appropriate
      // to show the use what we are loading data
      state.isLoading = true;
    });
    // 2. fetchUsers.fulfilled === 'users/fetch/fulfilled'
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    // 3. fetchUsers.rejected === 'users/fetch/rejected'
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => {
        // 어느 유저를 지웠는지
        return user.id !== action.payload.id;
      });
      console.log(action);
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;

/*
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
  },
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
*/
