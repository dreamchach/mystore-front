import { createSlice } from "@reduxjs/toolkit"
import { addProduct, cartProduct, deleteCartProduct, loginUser, payCartProduct, reMyInfo, registerUser } from "./thunkFunctions"

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
            console.log('state', state)
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user.userData = action.payload.auth
            console.log('action', action.payload.auth)
            console.log('state', state)
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData = action.payload.auth
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

        .addCase(cartProduct.pending, (state) => {
            state.isLoading = true
            console.log('state', state)
        })
        .addCase(cartProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData.cart = action.payload
        })
        .addCase(cartProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        .addCase(deleteCartProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteCartProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData.cart = action.payload
        })
        .addCase(deleteCartProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        .addCase(payCartProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(payCartProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData.cart = action.payload.cart
            state.userData.history = action.payload.history
        })
        .addCase(payCartProduct.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        .addCase(reMyInfo.pending, (state) => {
            state.isLoading = true
        })
        .addCase(reMyInfo.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData = action.payload.user
        })
        .addCase(reMyInfo.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default userSlice.reducer