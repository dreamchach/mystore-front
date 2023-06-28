import { createSlice } from "@reduxjs/toolkit"
import { addProduct, loginUser, registerUser } from "./thunkFunctions"

const initialState = {
    userData : {
        email : '',
        displayName : '',
        profileImgBase64 : ''
    },
    isLoading: false,
    error : ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        .addCase(addProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addProduct.fulfilled, (state) => {
            state.isLoading = false
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default userSlice.reducer