"use client";

import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useNotifyFetch } from "@/utils/useNotifyFetch";

interface CreateTaskFabProps {
  onCreated?: () => void;
}

export default function CreateTaskFab({ onCreated }: CreateTaskFabProps) {
  const [open, setOpen] = React.useState(false);
  const [newTaskName, setNewTaskName] = React.useState("");
  const [creating, setCreating] = React.useState(false);
  const theme = useTheme();
  const notifyFetch = useNotifyFetch();

  const handleCreateTask = async () => {
    setCreating(true);
    try {
      const res = await notifyFetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/tasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newTaskName }),
        },
        {
          successMsg: "Task created successfully!",
          errorMsg: "Failed to create task.",
        }
      );
      if (res.ok) {
        setOpen(false);
        setNewTaskName("");
        if (onCreated) onCreated();
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1300,
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            minWidth: { xs: 300, sm: 400 },
            background: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "1.4rem",
            pb: 0,
          }}
        >
          Create New Task
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Enter a description for your new task.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            variant="outlined"
            sx={{
              mb: 2,
              background: "#f9f9f9",
              borderRadius: 2,
            }}
            inputProps={{ maxLength: 100 }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            disabled={creating}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTask}
            disabled={!newTaskName.trim() || creating}
            variant="contained"
            color="primary"
            sx={{ minWidth: 100, fontWeight: 600 }}
          >
            {creating ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
