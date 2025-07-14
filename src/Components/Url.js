import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { log } from "../Logging/Log";

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([
    { longUrl: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);
  const token = "<YOUR_ACCESS_TOKEN>";

  const generateShortUrl = (shortcode = "") => {
    const suffix = shortcode || Math.random().toString(36).substring(2, 8);
    return `https://shorturl/${suffix}`;
  };

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
    } else {
      log("frontend", "warn", "component", "Tried to add more than 5 URLs", token);
    }
  };

  const handleSubmit = async () => {
    const newResults = [];

    for (let i = 0; i < urls.length; i++) {
      const { longUrl, validity, shortcode } = urls[i];

      try {
        new URL(longUrl);
      } catch (_) {
        await log("frontend", "error", "component", `Invalid URL: ${longUrl}`, token);
        alert(`Invalid URL at row ${i + 1}`);
        return;
      }

      const shortUrl = generateShortUrl(shortcode);
      const timestamp = new Date().toLocaleString();

      await log(
        "frontend",
        "info",
        "component",
        `Shortened ${longUrl} to ${shortUrl} at ${timestamp}`,
        token
      );

      newResults.push({
        original: longUrl,
        short: shortUrl,
        time: timestamp,
        validity: validity || "Default",
      });
    }

    setResults(newResults);
  };

  return (
    <Paper elevation={4} sx={{ p: 4, mt: 4, maxWidth: "1000px", mx: "auto",color:"green" }}>
      <Typography variant="h5" gutterBottom>
        Frontend URL Shortener
      </Typography>

      {urls.map((url, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Original URL"
                fullWidth
                value={url.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Validity (minutes)"
                type="number"
                fullWidth
                value={url.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={url.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Button variant="outlined" onClick={addField} sx={{ mr: 2 ,color:"green", borderColor:"green"}}>
        Add Another URL
      </Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 ,color:"white", backgroundColor:"green"}}>
        Shorten URLs
      </Button>

      {results.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Divider />
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            ✅ Shortened URL Results
          </Typography>
          {results.map((res, i) => (
            <Box
              key={i}
              sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
            >
              <Typography>
                <strong>Original URL:</strong> {res.original}
              </Typography>
              <Typography>
                <strong>Short URL:</strong>{" "}
                <Button
                  variant="text"
                  onClick={() => (window.location.href = res.original)}
                  sx={{ textTransform: "none", p: 0, minWidth: 0 }}
                >
                  {res.short}
                </Button>
              </Typography>
              <Typography>
                <strong>Timestamp:</strong> {res.time}
              </Typography>
              <Typography>
                <strong>Validity:</strong> {res.validity} minutes
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default UrlShortenerForm;
