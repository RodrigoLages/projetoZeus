import "./App.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./Context/AuthContext";
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
