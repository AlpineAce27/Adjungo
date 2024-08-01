import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import store from "./Redux/store.js"
import { Provider } from "react-redux"

//reference the index.html page and root element to render the application inside of
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
