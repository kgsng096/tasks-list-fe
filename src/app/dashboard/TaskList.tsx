"use client";

import * as React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

export interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} className="border-b last:border-b-0">
          <ListItemText
            primary={<span className="font-semibold">{task.title}</span>}
            secondary={task.description}
          />
        </ListItem>
      ))}
    </List>
  );
}
