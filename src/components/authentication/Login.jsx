import { signInWithEmailAndPassword } from "@firebase/auth";
import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

export const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { alert, setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!password || !email) {
      setAlert({
        open: true,
        message: "Missing info",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};
