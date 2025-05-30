"use client";

import { useEffect } from "react";
import { logout } from "@/utils/logout";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";

export default function LogoutPage() {
  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      window.location.href = "/login";
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#fff",
          borderRadius: 3,
        }}
      >
        <CircularProgress size={60} sx={{ mb: 4, color: "primary.main" }} />
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Logging out...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please wait while we securely log you out.
        </Typography>
      </Paper>
    </Box>
  );
}
