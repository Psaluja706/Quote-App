// src/pages/Listing.js
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { color } from "../colors";
import { designTheme } from "../designThems";
import { useNavigate } from "react-router-dom";

const Listing = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const apiURL =
        "https://assignment.stage.crafto.app/getQuotes?limit=20&offset=0";

      try {
        const response = await axios.get(apiURL, {
          headers: {
            Authorization: token, // Example Bearer token
          },
        });

        console.log(response.data); // Handle the response data
        setItems(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true)
      }

      setLoading(false);
    };

    fetchData();
  }, []);
  console.log({token})

  useEffect(() => {
    if (!token || error) {
      navigate("/login");
    }
  }, [token]);

  return (
    <ThemeProvider theme={designTheme}>
      <Stack sx={{ marginY: "10px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingX: "50px", marginBottom: "10px" }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              color: color.tableBlack,
              fontSize: "30px",
              marginBottom: "10px",
            }}
          >
            Quote Listing page
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/create")}
          >
            Create Quote
          </Button>
        </Stack>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ paddingLeft: "50px" }}
          >
            <Grid
              container
              columnSpacing={2}
              rowSpacing={2}
              sx={{
                maxHeight: "calc(100vh - 70px)",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {items?.map((item) => (
                <Grid item key={item?.id} xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item?.mediaUrl}
                      alt="Image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item?.text}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`By ${item?.username} 
                  ${moment(item?.createdAt).format("DD MMM")}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default Listing;
