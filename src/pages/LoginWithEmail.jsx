import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import OtpInput from "react-otp-input";
import DoneIcon from "@mui/icons-material/Done";
import { color } from "../colors";

const LoginWithEmail = ({
  isMobileScreen = false,
  isMobileLandscapeScreen = false,
  showOtpScreen = false,
  setShowOtpScreen = () => {},
  username,
  setUsername = () => {},
  handleSubmit = () => {},
  otp = "",
  setOtp = () => {},
}) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpError, setIsOtpError] = useState(false);

  const [optResendTime, setOtpResendTime] = useState(0);

  const handleSendOtpToClient = () => {
    setShowOtpScreen(true);
  };

  useEffect(() => {
    if (optResendTime === 0) {
      return;
    }

    if (!optResendTime) return;

    const intervalId = setInterval(() => {
      setOtpResendTime(optResendTime - 1);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [optResendTime]);

  useEffect(() => {
    if (otp?.length === 4) {
      handleSubmit();
    }

    if (otp?.length <= 4 && isOtpError) {
      setIsOtpError(false);
    }
  }, [otp]);

  return (
    <>
      {!showOtpScreen ? (
        <>
          <TextField
            required
            label="Username"
            size="small"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            variant="outlined"
            fullWidth
            // error={email !== "" && !/\S+@\S+\.\S+/.test(email)}
            // helperText={
            //   email !== "" && !/\S+@\S+\.\S+/.test(email)
            //     ? "Invalid email address"
            //     : ""
            // }
            sx={{
              marginTop: "32px",
              span: {
                color: color.redOrange,
              },
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendOtpToClient();
              }
            }}
          />
          <Button
            size="small"
            variant="contained"
            disabled={!username?.length}
            sx={{
              width: !isMobileScreen ? 377 : "100%",
              height: 44,
              marginTop: "18px",
              background: color.darkBlue,
              ":hover": { background: color.darkBlue },
            }}
            onClick={handleSendOtpToClient}
          >
            Send verification code
          </Button>
        </>
      ) : (
        <>
          <Typography
            sx={{ textAlign: "center", fontSize: "20px", fontWeight: "500" }}
          >
            Enter password
          </Typography>
          <Typography
            sx={{
              marginTop: 2.5,
              fontSize: "14px",
              fontWeight: "400",
              color: color.tableGrey,
              textAlign: "center",
            }}
          >
            {/* Please enter the 4-digits verification code sent to {email} */}
            <span
              onClick={() => setShowOtpScreen(false)}
              style={{
                marginLeft: "4px",
                color: "#109CF1",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Change
            </span>
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ position: "relative", marginY: "20px" }}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputType="number"
              shouldAutoFocus={true}
              renderSeparator={<span style={{ width: "8px" }} />}
              inputStyle={{
                border: `1px solid ${
                  isOtpError ? color.redOrange : color.disabledGrey
                }`,
                borderRadius: "8px",
                width: "36px",
                height: "44px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue",
              }}
              renderInput={(props) => <input {...props} />}
            />
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{
                position: "absolute",
                bottom: "-60%",
                color: color.darkBlue,
                fontWeight: "500",
                fontSize: "14px",
                marginTop: "8px",
                textDecoration: !optResendTime ? "underline" : "unset",
                cursor: !optResendTime ? "pointer" : "none",
              }}
              onClick={() => {
                if (!optResendTime) {
                  setOtp("");
                  handleSendOtpToClient();
                }
              }}
            >
              {!optResendTime
                ? "Resend code"
                : `Resend in ${optResendTime} second`}
            </Stack>
          </Stack>
          <Button
            size="small"
            variant="contained"
            disabled={otp?.length !== 4}
            sx={{
              width: !isMobileScreen ? 377 : "100%",
              height: 44,
              marginTop: "32px",
            }}
            style={{ backgroundColor: isOtpVerified ? color.green2 : "" }}
            onClick={handleSubmit}
          >
            {isOtpVerified ? (
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography>Verified</Typography>
                <DoneIcon />
              </Stack>
            ) : (
              "Verify code"
            )}
          </Button>
        </>
      )}
    </>
  );
};

export default LoginWithEmail;
