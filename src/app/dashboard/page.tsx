"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as Mui from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import CreateTaskFab from "./CreateTaskFab";
import { useDispatch, useSelector } from "react-redux";
import { authFetch } from "@/utils/authFetch";
import { fetchTasks } from "@/store/taskSlice";

const {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Paper,
  Tabs,
  Tab,
} = Mui;

const drawerWidth = 240;

export default function DashboardPage() {
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.tasks.status);
  const error = useSelector((state: any) => state.tasks.error);
  const csrfToken = useSelector((state: any) => state.csrf.token);
  const [tasks, setTasks] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [userRole, setUserRole] = React.useState<number | null>(null);

  // Check for credentials on mount
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      window.location.href = "/login";
    }
  }, []);

  // This function fetches the latest tasks
  const fetchData = async () => {
    let url =
      tab === 0
        ? `${process.env.NEXT_PUBLIC_API_HOST}/api/users/my-tasks`
        : `${process.env.NEXT_PUBLIC_API_HOST}/api/tasks`;
    const res = await authFetch(url);
    // If unauthorized, redirect to login
    if (res.status === 401 || res.status === 403) {
      window.location.href = "/login";
      return;
    }
    const data = await res.json();
    if (tab === 0 && data.result && Array.isArray(data.result.tasks)) {
      setTasks(
        data.result.tasks.map((task: any) => ({
          ...task,
          updatedAt: task.updatedAt || new Date().toISOString(),
        }))
      );
      setUserRole(data.result.role?.id ?? null);
    } else if (tab === 1 && Array.isArray(data)) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  };

  // Fetch tasks on mount and when needed
  useEffect(() => {
    fetchData();
  }, [tab]);

  const userLocale =
    typeof window !== "undefined" ? navigator.language : "en-US";

  React.useEffect(() => {
    if (csrfToken) {
      dispatch(fetchTasks());
    }
  }, [csrfToken, dispatch]);

  // Pass this to TaskList
  const updateTask = async (taskId: string, name: string) => {
    const res = await authFetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );
    if (!res.ok) throw new Error("Failed to update task");
    await fetchData(); // Refresh tasks after update
  };

  // Delete task function
  const deleteTask = async (taskId: string) => {
    const res = await authFetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) throw new Error("Failed to delete task");
    await fetchData(); // Refresh tasks after delete
  };

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Tasks Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} anchor="left" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          transition: "margin .3s",
          marginLeft: open ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: open ? 700 : 1100,
            minWidth: 320,
            mx: "auto",
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            boxShadow: 3,
            background: "rgba(255,255,255,0.95)",
            transition: "max-width .3s",
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
            {userRole === 1 && <Tab label="All Tasks" />}
          </Tabs>
          <Box className="mt-4">
            {tab === 0 && (
              <TaskList
                tasks={tasks}
                locale={userLocale}
                onTasksChanged={fetchData}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            )}
            {tab === 1 && userRole === 1 && (
              <TaskList
                tasks={tasks}
                locale={userLocale}
                onTasksChanged={fetchData}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            )}
          </Box>
        </Paper>
        {tab === 0 && <CreateTaskFab onCreated={fetchData} />}
      </Box>
    </Box>
  );
}
