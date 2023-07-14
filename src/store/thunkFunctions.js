import { instance } from "@/apis/instance";
import { getCookie, setCookie } from "@/utill/cookies";
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
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (body, thunkAPI) => {
        try {
            const response = await instance.post('/api/auth/login', body)
            if(response.data.auth._id === '64939e2f8399fb5f2aabbcb0'){
                await setCookie('masterkey', true)
            }
            await setCookie('accessToken', response.data.accessToken)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const addProduct = createAsyncThunk(
    'user/addProduct',
    async (body, thunkAPI) => {
        try {
            const response = await instance.post('/api/products', body)
            console.log(response.data)
            location.href = '/admin/viewproducts'
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const cartProduct = createAsyncThunk(
    'user/cartProduct',
    async (body, thunkAPI) => {
        try {
            const response = await instance.post('/api/products/buy', body)
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const deleteCartProduct = createAsyncThunk(
    'user/deleteCartProduct',
    async (body, thunkAPI) => {
        try {
            const response = await instance.post('/api/products/cancel', body)
            console.log(response)
            return response.data.userProduct.cart
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const payCartProduct = createAsyncThunk(
    'user/payCartProduct',
    async (body, thunkAPI) => {
        try {
            const response = await instance.post('/api/products/ok', body)
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const reMyInfo = createAsyncThunk(
    'user/reMyInfo',
    async (body, thunkAPI) => {
        try {
            const response = await instance.put('/api/auth/user', body)
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)