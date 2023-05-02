// fetchUsers 와 마찬가지로 request가 성공했을 때 유저 내용을 담아줌

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// create random name
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName(),
  });
  return response.data;
});

export { addUser };

/*
// fetchUsers 와 마찬가지로 request가 성공했을 때 유저 내용을 담아줌

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// create random name
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName(),
  });
  return response.data;
});

export { addUser };
 */
