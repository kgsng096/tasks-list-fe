"use client";

import React from "react";
import Cookies from "js-cookie";
import { Paper, Typography, Box, Divider } from "@mui/material";
import { useRoles } from "@/hooks/useRoles";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import LoadingScreen from "../components/LoadingScreen";

export default function ProfilePage() {
  const { roles, loading } = useRoles(true);

  // Read user from cookies
  let user = null;
  if (typeof window !== "undefined") {
    const userCookie = Cookies.get("user");
    user = userCookie ? JSON.parse(userCookie) : null;
  }

  if (!user) {
    return (
      <Typography align="center" sx={{ mt: 6 }}>
        Unable to load profile information.
      </Typography>
    );
  }

  if (loading) {
    return <LoadingScreen message="Loading your profile..." />;
  }

  // Find the role name from the roles array
  const roleName =
    roles.find((role) => role.id === user.roleId)?.name || "Unknown";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f4fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <ProfileHeader user={user} />
        <Divider />
        <ProfileDetails roleName={roleName} />
      </Paper>
    </Box>
  );
}
