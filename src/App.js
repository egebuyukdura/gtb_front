import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./public_page/Layout";
import Public from "./public_page/Public";
import Login from "./features/auth/Login";
import LoginReauth from "./features/auth/LoginReauth";
import PersistLogin from "./features/auth/PersistLogin";

import DappLayout from "./dapp_page/DappLayout";
import Dapp from "./dapp_page/Dapp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="loginReauth" element={<LoginReauth />} />

        <Route element={<PersistLogin />}>
          <Route path="dapp" element={<DappLayout />}>
            <Route index element={<Dapp />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
