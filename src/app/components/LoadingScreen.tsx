import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingScreen({ message = "Loading..." }: { message?: string }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f4fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={60} thickness={5} />
      <Typography sx={{ mt: 3, fontWeight: 500, color: "#1976d2" }}>
        {message}
      </Typography>
    </Box>
  );
}