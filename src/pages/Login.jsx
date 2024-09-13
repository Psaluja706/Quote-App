// src/pages/Login.js
import {
  Box,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { designTheme } from "../designThems";
import { color } from "../colors";
import LoginWithEmail from "./LoginWithEmail";

const Login = () => {
  const isMobileScreen = false || {};
  const isMobileLandscapeScreen = false || {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [src, { blur }] = useProgressiveImage(thumbnail, leftBackgroundImage);
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");

    const apiURL = "https://assignment.stage.crafto.app/login";

    try {
      const response = await axios.post(apiURL, {
        username,
        otp,
      });

      console.log({ response });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/list");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }

    setLoading(false);
  };

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <form onSubmit={handleSubmit}>
    //     <h2>Login</h2>
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //     <div>
    //       <label>Username:</label>
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit" disabled={loading}>
    //       {loading ? "Logging in..." : "Login"}
    //     </button>
    //   </form>
    // </div>
    <ThemeProvider theme={designTheme}>
      {isMobileView && (
        <Stack sx={{ width: "100vw", height: "100vh" }}>
          <Box
            sx={{
              background: `url('https://img.freepik.com/free-vector/light-green-paint-background_78370-1861.jpg') no-repeat center center/cover`,
              height: "50%",
              //   filter: blur ? "blur(20px)" : "none",
              //   transition: blur ? "none" : "filter 0.3s ease-out",
            }}
          />
          <Stack alignItems="center" height="50%" p={2} pt={4} gap={2}>
            <img
              src={"https://www.kutumbapp.com/public/images/main/k-logo.svg"}
              height={28}
              width={216}
              alt="logo"
            />
            <Stack
              gap={3}
              alignItems="center"
              justifyContent="center"
              sx={{ color: color.normalGrey }}
            >
              <Typography fontSize={20} sx={{ textAlign: "center" }}>
                Big Dreams delivered <br /> on Large Screens
              </Typography>
              <Typography fontSize={16}>
                Please Login on Desktop for Best View
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {!isMobileView && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100vh",
            width: "100vw",
            background: `url(https://img.freepik.com/free-vector/light-green-paint-background_78370-1861.jpg) no-repeat center center/cover`,
            position: "relative",
          }}
        >
          <Stack
            direction="row"
            sx={{
              borderRadius: "12px",
              width: "950px",
              height: "500px",
              overflow: "hidden",
            }}
          >
            <Stack sx={{ width: "50%" }}>
              <img
                src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
                height="100%"
                width="100%"
                alt="login-screen"
                style={{
                  objectFit: "cover",
                  //   filter: blur ? "blur(20px)" : "none",
                  //   transition: blur ? "none" : "filter 0.3s ease-out",
                }}
              />
            </Stack>
            <Stack
              justifyContent="center"
              sx={{
                width: "50%",
                background: "white",
                boxSizing: "border-box",
              }}
              px={6}
              py={5}
            >
              <Stack alignItems="center" gap={2}>
                <img
                  src={
                    "https://www.kutumbapp.com/public/images/main/k-logo.svg"
                  }
                  height={38}
                  width={216}
                  alt="logo"
                />
                <Typography
                  sx={{
                    color: color.tableBlack,
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Just a Login Away.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  padding: "20px",
                  borderRadius: "10px",
                  // boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
                }}
                p={2}
              >
                <LoginWithEmail
                  showOtpScreen={showOtpScreen}
                  setShowOtpScreen={setShowOtpScreen}
                  isMobileScreen={isMobileScreen || isMobileLandscapeScreen}
                  isMobileLandscapeScreen={isMobileLandscapeScreen}
                  username={username}
                  setUsername={setUsername}
                  otp={otp}
                  setOtp={setOtp}
                  handleSubmit={handleSubmit}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </ThemeProvider>
  );
};

export default Login;
