import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function TaskTable({
  tasks,
  locale,
  editingId,
  setEditingId,
  editValue,
  setEditValue,
  onUpdateTask,
  setDeleteId,
}: {
  tasks: any[];
  locale?: string;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  editValue: string;
  setEditValue: (val: string) => void;
  onUpdateTask: (taskId: string, name: string) => Promise<void>;
  setDeleteId: (id: string | null) => void;
}) {
  const handleSave = async (taskId: string) => {
    if (!editValue.trim()) return;
    try {
      await onUpdateTask(taskId, editValue);
      setEditingId(null);
      setEditValue("");
    } catch {
      alert("Failed to update task");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              backgroundColor: "#e3eafc",
              fontWeight: "bold",
              border: "1px solid #e0e0e0",
              fontSize: 16,
            }}
          >
            Task Description
          </TableCell>
          <TableCell
            sx={{
              backgroundColor: "#e3eafc",
              fontWeight: "bold",
              border: "1px solid #e0e0e0",
              fontSize: 16,
            }}
          >
            Updated At
          </TableCell>
          <TableCell
            sx={{
              backgroundColor: "#e3eafc",
              fontWeight: "bold",
              border: "1px solid #e0e0e0",
              fontSize: 16,
            }}
            align="center"
          >
            Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task, idx) => (
          <TableRow
            key={task.id}
            sx={{
              backgroundColor: idx % 2 === 0 ? "#f5faff" : "#fff",
              transition: "background 0.2s",
              "&:hover": {
                backgroundColor: "#e3eafc",
              },
            }}
          >
            <TableCell sx={{ border: "1px solid #e0e0e0", p: 1 }}>
              {editingId === task.id ? (
                <TextField
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  size="small"
                  autoFocus
                  fullWidth
                  variant="outlined"
                  inputProps={{ style: { fontSize: 16 } }}
                />
              ) : (
                <Typography sx={{ fontSize: 16 }}>{task.name}</Typography>
              )}
            </TableCell>
            <TableCell sx={{ border: "1px solid #e0e0e0" }}>
              <Typography sx={{ fontSize: 15 }}>
                {task.updatedAt
                  ? new Date(task.updatedAt).toLocaleString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </Typography>
            </TableCell>
            <TableCell sx={{ border: "1px solid #e0e0e0" }} align="center">
              {editingId === task.id ? (
                <>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleSave(task.id)}
                    aria-label="save"
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={handleCancel}
                    aria-label="cancel"
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      setEditingId(task.id);
                      setEditValue(task.name);
                    }}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleteId(task.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}