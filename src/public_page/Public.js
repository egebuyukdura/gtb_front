import "./Public.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import { Box, Stack, TextField, Button } from "@mui/material";
import { useMutation } from "react-query";
import { login } from "../app/api/authApi";
import useAuthStore from "../app/stores/authStore";
import usePersist from "../hooks/usePersist";

const Public = () => {
  const [, setPersist] = usePersist();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      loginStore(data?.userName, data?.tier, data?.accessToken);
      setUsername("");
      setPassword("");
      navigate("/dapp");
    },
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    setPersist(true);
    await loginMutation.mutateAsync({ username, password });
  };

  return (
    <div>
      <Box component="form" onSubmit={loginSubmit}>
        <Stack direction="row" spacing={3} sx={{ justifyContent: "center" }}>
          <TextField
            size="small"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            size="small"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button variant="outlined" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
      <Footer />
    </div>
  );
};

export default Public;
