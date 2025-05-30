"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

interface Task {
  name: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Task[];
  locale?: string;
}

export default function TaskList({ tasks, locale = "en-US" }: TaskListProps) {
  if (!Array.isArray(tasks)) return null;

  if (!tasks || tasks.length === 0) {
    return (
      <Typography align="center" sx={{ my: 4 }}>
        No tasks found.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
                border: "1px solid #e0e0e0",
              }}
            >
              Task Description
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
                border: "1px solid #e0e0e0",
              }}
            >
              Updated At
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, idx) => (
            <TableRow
              key={task?.updatedAt + task?.name}
              sx={{
                backgroundColor: idx % 2 === 0 ? "#fafafa" : "#fff",
              }}
            >
              <TableCell sx={{ border: "1px solid #e0e0e0" }}>
                {task?.name}
              </TableCell>
              <TableCell sx={{ border: "1px solid #e0e0e0" }}>
                {task?.updatedAt
                  ? new Date(task.updatedAt).toLocaleString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
