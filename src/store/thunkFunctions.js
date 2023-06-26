import { instance } from "@/apis/instance";
import { setCookie } from "@/utill/cookies";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(body, thunkAPI) => {
        try {
            const response = await instance.post('/api/auth/signup', body)
            await setCookie('accessToken', response.data.accessToken)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.message || error.response.data)
        }
    }
)