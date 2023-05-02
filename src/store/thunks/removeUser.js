import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async('id의 아이디')
const removeUser = createAsyncThunk("users/remove", async (user) => {
  const response = await axios.delete(`http://localhost:3005/users/${user.id}`);
  // Payload 에 어느 유저가 삭제되었는지 리턴함
  return user;
});

export { removeUser };
