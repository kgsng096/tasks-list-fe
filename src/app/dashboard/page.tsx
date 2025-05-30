"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import TaskList, { Task } from "./TaskList";

const drawerWidth = 240;

const tasks: Task[] = [
  { id: 1, title: "Task One", description: "First task description" },
  { id: 2, title: "Task Two", description: "Second task description" },
  { id: 3, title: "Task Three", description: "Third task description" },
];

export default function DashboardPage() {
  const [open, setOpen] = React.useState(true);
  const [tab, setTab] = React.useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#1e293b",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Tasks Management
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setOpen(!open)}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Sidebar on the right */}
      <Sidebar open={open} anchor="right" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          transition: "margin .3s",
          marginRight: { lg: open ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar />
        <Paper
          elevation={4}
          sx={{
            maxWidth: 900,
            mx: "auto",
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            boxShadow: 3,
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant="fullWidth"
            sx={{
              mb: 2,
              ".MuiTab-root": {
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              },
            }}
          >
            <Tab label="My Tasks" />
            <Tab label="All Tasks" />
          </Tabs>
          <Box className="mt-4">
            <TaskList tasks={tasks} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
