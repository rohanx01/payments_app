import {BrowserRouter,Routes, Route, Navigate} from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { Send } from "./pages/Send"
function App() {
  return (
    <>
        <Routes>
            <Route path="/" element = {<Navigate to="/signup"/>} />
            <Route path="/signup" element = {<Signup></Signup>}/>
            <Route path="/signin" element = {<Signin></Signin>}/>
            <Route path="/dashboard" element = {<Dashboard></Dashboard>}/>
            <Route path="/send" element = {<Send></Send>}/>
        </Routes>
    </>
  )
}

export default App
