import { io } from 'socket.io-client'

const socket = io(import.meta.env["BACKEND_URI"])

export const useSocket = () => socket
export const createSocket = () => ({
  install: (app) => {
    app.config.globalProperties.$socket = socket

    app.provide('socket', socket)
  }
})