import { login } from '@/services/client-side'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const loginAsync = createAsyncThunk('login', async ({ phone, password }, store) => {
  try {
    console.log(phone, password)
    const user = await login({ phone, password })
    return user
  } catch (error) {
    return error.message
  }
})

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    account: {
      user: {},
    },
    loginForm: {
        phone: '',
      password: ''
    },
    registerForm: {
      read_only: false,
      bank_code: '',
      number_bank: '',
      phone_number: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
      email: '',
      line_id: '',
      known_from: '',
      ref: '',
      birth_of_day: ''
    },
    restoreForm: {
      otp: '',
      newPassword: '',
      confirmNewPassword: '',
      phone: '',
      accountBankCode: '',
      accountNumber: '',
      firstName: '',
      lastName: '',
      readOnly: false
    },
    isLoggedIn: false,
    isAuthModalOpen: false,
    authModalContent: 'login',
    registerStep: 1
  },

  reducers: {
    setFriendReferral: (state, action) => {
      state.registerForm.ref = action.payload
    },
    setUser: (state, action) => {
      state.account = { ...state.account, ...action.payload }
      state.isLoggedIn = true
    },
    setAuthModal: (state, action) => {
      state.isAuthModalOpen = action.payload.status
      state.authModalContent = action.payload.content
    },
    setLoginForm: (state, action) => {
      state.loginForm[action.payload.field] = action.payload.value
    },
    setRegisterForm: (state, action) => {
      state.registerForm[action.payload.field] = action.payload.value
    },
    setRestoreForm: (state, action) => {
      state.restoreForm[action.payload.field] = action.payload.value
    },
    loggedInSuccess: (state, action) => {
      state.account = action.payload.user
      state.isLoggedIn = true
    },
    setRegisterStep: (state, action) => {
      state.registerStep = action.payload.step
    },
    setAuthContent: (state, action) => {
      state.authModalContent = action.payload.content
    },
    logout: (state, action) => {
      state.isLoggedIn = false
    },
    updateWallet: (state, action) => {
      state.account.balance_user_main = action.payload.balance_user_main
      state.account.bonus_user_main = action.payload.bonus_user_main
      state.account.coins = action.payload.coins
    },
    setUserBirthDay: (state, action) => {
      state.account.birth_of_day = action.payload
    },
    setJavis: (state, action) => {
      state.account.user_javis.javis_user_open_status = action.payload
    },
  },

  extraReducers: {
    [HYDRATE]: (_, action) => {
      return action.payload.auth
    },
    [loginAsync.pending]: (state, action) => {
      console.log(action)
    },
    [loginAsync.fulfilled]: (state, action) => {
      console.log(action)
    },
    [loginAsync.reject]: (state, action) => {
      console.log(action)
    }
  }
})

export const { setJavis, setRestoreForm, setUserBirthDay, setFriendReferral, updateWallet, setUser, setAuthModal, setLoginForm, setRegisterForm, loggedInSuccess, setAuthContent, setRegisterStep, logout } = authSlice.actions
export default authSlice.reducer
