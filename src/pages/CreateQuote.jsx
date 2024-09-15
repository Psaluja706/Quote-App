import {
  Button,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { color } from "../colors";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { designTheme } from "../designThems";
import { useNavigate } from "react-router-dom";

const CreateQuote = () => {
  const inputRef = useRef();
  const [quote, setQuote] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const generateUrlApi = async (formData) => {
    const apiURL = "https://crafto.app/crafto/v1.0/media/assignment/upload";
    try {
      const response = await axios.post(apiURL, formData);

      console.log("API Response:", response);
      return response.data?.[0]?.url || "";
    } catch (err) {
      console.error("API Error:", err);
    }
    return "";
  };

  const onFileUpload = async (payload) => {
    const apiURL = "https://assignment.stage.crafto.app/postQuote";

    // Destructure payload for clarity
    const { url: mediaUrl } = payload?.[0] || {};

    if (!mediaUrl) {
      console.error("No media URL found in payload.");
      return "";
    }

    if (!token || !quote) {
      console.error("Missing token or quote.");
      return "";
    }

    try {
      const response = await axios.post(
        apiURL,
        {
          text: quote,
          mediaUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.status === 200) {
        setQuote("");
        alert("Quote created successfully");
      }
    } catch (err) {
      console.error(
        "API Error:",
        err.response ? err.response.data : err.message
      );
      return "";
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    // Get files from either drag-drop or input change event
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const resultantFiles = [];

    console.log({ files });

    if (files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]); // Append the file to FormData

      const url = await generateUrlApi(formData); // Call the API to upload

      const imageId = uuidv4();
      resultantFiles.push({ id: imageId, url });
    }

    await onFileUpload(resultantFiles); // Trigger file upload callback
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  return (
    <ThemeProvider theme={designTheme}>
      <Stack sx={{ padding: "20px" }}>
        <Typography
          sx={{
            color: color.tableBlack,
            fontSize: "20px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          Enter Quote
        </Typography>
        <TextField
          autoFocus
          multiline
          rows={4}
          sx={{ width: "100%" }}
          value={quote}
          onChange={(e) => {
            const val = e.target.value;
            if (val?.length <= 40) {
              setQuote(val);
            }
          }}
          helperText={`Please enter less then ${
            quote?.length || 0
          }/40 characters`}
        />
        <input type="file" hidden ref={inputRef} onChange={handleDrop} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => inputRef.current.click()}
          sx={{ fontSize: "14px", marginTop: "10px" }}
          disabled={!quote}
        >
          Upload Image
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default CreateQuote;
