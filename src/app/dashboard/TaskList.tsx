"use client";

import React, { useState } from "react";
import { Paper, Typography, TableContainer, Table, TablePagination } from "@mui/material";
import TaskTable from "./TaskTable";
import DeleteTaskDialog from "./DeleteTaskDialog";

export default function TaskList({
  tasks,
  locale = "en-US",
  onUpdateTask,
  onDeleteTask,
}: {
  tasks: any[];
  locale?: string;
  onUpdateTask: (taskId: string, name: string) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const rowsPerPage = 10;

  if (!tasks || tasks.length === 0) {
    return (
      <Typography align="center" sx={{ my: 4 }}>
        No tasks found.
      </Typography>
    );
  }

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const paginatedTasks = sortedTasks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{
        maxWidth: 1100,
        width: "100%",
        margin: "40px auto",
        boxShadow: 4,
        borderRadius: 3,
        p: 3,
        background: "#f7fafc",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "#1976d2",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Task Dashboard
      </Typography>
      <TableContainer sx={{ borderRadius: 2, maxHeight: 600, width: "100%" }}>
        <TaskTable
          tasks={paginatedTasks}
          locale={locale}
          editingId={editingId}
          setEditingId={setEditingId}
          editValue={editValue}
          setEditValue={setEditValue}
          onUpdateTask={onUpdateTask}
          setDeleteId={setDeleteId}
        />
      </TableContainer>
      <TablePagination
        component="div"
        count={tasks.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        sx={{
          ".MuiTablePagination-toolbar": { background: "#f5faff" },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
            fontSize: 14,
          },
          width: "100%",
        }}
      />
      <DeleteTaskDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) {
            await onDeleteTask(deleteId);
            setDeleteId(null);
          }
        }}
      />
    </Paper>
  );
}
