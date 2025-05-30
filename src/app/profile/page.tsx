"use client";

import React, { Suspense } from "react";
import Cookies from "js-cookie";
import { Paper, Typography, Box, Divider, CircularProgress } from "@mui/material";
import { useRoles } from "@/hooks/useRoles";

// Lazy load components
const ProfileHeader = React.lazy(() => import("./ProfileHeader"));
const ProfileDetails = React.lazy(() => import("./ProfileDetails"));
const LoadingScreen = React.lazy(() => import("../components/LoadingScreen"));

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
    return (
      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
          >
            <CircularProgress />
          </Box>
        }
      >
        <LoadingScreen message="Loading your profile..." />
      </Suspense>
    );
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
        <Suspense
          fallback={
            <Box py={6} textAlign="center">
              <CircularProgress />
            </Box>
          }
        >
          <ProfileHeader user={user} />
        </Suspense>
        <Divider />
        <Suspense
          fallback={
            <Box py={6} textAlign="center">
              <CircularProgress />
            </Box>
          }
        >
          <ProfileDetails roleName={roleName} />
        </Suspense>
      </Paper>
    </Box>
  );
}
