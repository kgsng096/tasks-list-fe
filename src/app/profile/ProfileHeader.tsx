import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function ProfileHeader({ user }: { user: any }) {
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: "#1976d2",
        color: "#fff",
        py: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => router.back()}
        sx={{
          position: "absolute",
          left: 16,
          top: 16,
          color: "#1976d2",
          bgcolor: "#fff",
          "&:hover": { bgcolor: "#e3eafc" },
          boxShadow: 1,
        }}
        aria-label="Back"
      >
        <ArrowBackIcon />
      </IconButton>
      <Avatar
        sx={{
          width: 90,
          height: 90,
          bgcolor: "#fff",
          color: "#1976d2",
          fontSize: 40,
          mb: 2,
          border: "4px solid #fff",
          boxShadow: 2,
        }}
      >
        {user.firstName?.[0]?.toUpperCase() ||
          user.email?.[0]?.toUpperCase() ||
          "U"}
      </Avatar>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {user.firstName || "No Name"} {user.lastName || ""}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.85 }}>
        {user.email}
      </Typography>
    </Box>
  );
}