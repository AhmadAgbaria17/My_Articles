import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider , RequireAuth } from "react-auth-kit";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<RequireAuth loginPath="/">
            <Home />
          </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
