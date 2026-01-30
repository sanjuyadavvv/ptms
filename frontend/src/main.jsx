import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from './redux/Store.js'

import { Provider } from 'react-redux'
const clientID=import.meta.env.VITE_CLIENTID

console.log(clientID)


createRoot(document.getElementById('root')).render(

<GoogleOAuthProvider clientId={clientID}>
     <Provider store={store}>


        <App />
     </Provider>
  

</GoogleOAuthProvider>


   
 
)
