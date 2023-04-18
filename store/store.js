import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'


import authReducer from '../slices/authSlice'

const makeStore = (ctx) => {

  const isServer = typeof window === 'undefined';
  if (isServer) {

  }

  return configureStore({
    reducer: {
      auth: authReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
  })


}

export const wrapper = createWrapper(makeStore)
