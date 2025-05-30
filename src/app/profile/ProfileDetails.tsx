import { Box, Typography } from "@mui/material";

export default function ProfileDetails({ roleName }: { roleName: string }) {
  return (
    <Box sx={{ p: 4, pt: 3 }}>
      <Typography variant="subtitle2" sx={{ color: "#888", mb: 0.5 }}>
        Role
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
        {roleName}
      </Typography>
      {/* Add more fields here if needed */}
    </Box>
  );
}