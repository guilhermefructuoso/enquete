import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'

import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <App />
        <ToastContainer autoClose={3000} />
    </React.StrictMode>,
    document.getElementById('root')
)
