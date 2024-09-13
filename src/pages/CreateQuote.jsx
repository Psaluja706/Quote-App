import { Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { color } from "../colors";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const CreateQuote = () => {
  const generateUrlApi = async (data) => {
    const apiURL = "https://crafto.app/crafto/v1.0/media/assignment/upload";
    try {
      const response = await axios.post(apiURL, {
        data,
      });

      console.log({ response });
      console.log(response);
      //   if (response.status === 200) {
      //     localStorage.setItem("token", response.data.token);
      //     navigate("/list");
      //   } else {
      //     setError("Invalid credentials");
      //   }
    } catch (err) {
      //   setError("Something went wrong, please try again.");
    }
    // return res?.data?.result?.url;
    return "";
  };

  const onFileUpload = (payload) => {
    // const added = payload?.map(({ id, name, url }) => {
    //   return {
    //     attachmentId: id,
    //     name,
    //     image: url,
    //     type: ATTACHMENT_TYPE.DOCUMENTS,
    //     markers: [],
    //   };
    // });
    // addRemoveAttachments({ added, removed: [] });
    console.log({payload})
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const { files } = e.dataTransfer || e.target;
    const resultantFiles = [];
    if (files?.length > 0) {
      for (let i = 0; i < files?.length; i++) {
        try {
          const fileExtension = files[i]?.name?.split(".").pop();
          const fileName = files[i]?.name?.split(".")?.[0];
          const formData = new FormData();
          formData.append("file", files[i]);
          // eslint-disable-next-line no-await-in-loop
          const url = await generateUrlApi(formData);
          const imageId = uuidv4();
          resultantFiles.push({ id: imageId, name: fileName, url });
        } catch (error) {
          //   notify("error", error);
          alert("Error");
        }
      }
      onFileUpload(resultantFiles);
    }
  };
  const inputRef = useRef();
  const [quote, setQuote] = useState("");

  return (
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
      <input type="file" hidden ref={inputRef} onChange={handleDrop} multiple />
    </Stack>
  );
};

export default CreateQuote;
