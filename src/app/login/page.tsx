"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useRouter } from "next/navigation";

type Role = {
  id: number;
  name: string;
};

export default function LoginRegisterPage() {
  const router = useRouter();
  const [tab, setTab] = React.useState(0);
  const [roles, setRoles] = React.useState<Role[]>([]);

  // Fetch roles when Register tab is selected
  React.useEffect(() => {
    if (tab === 1 && roles.length === 0) {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/roles`)
        .then((res) => res.json())
        .then((data) => setRoles(data))
        .catch(() => setRoles([]));
    }
  }, [tab, roles.length]);

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
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {tab === 0 && (
          <LoginForm onSuccess={() => router.push("/dashboard")} />
        )}
        {tab === 1 && (
          <RegisterForm
            roles={roles}
            onSuccess={() => {
              // Optionally switch to login tab or show a message
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
