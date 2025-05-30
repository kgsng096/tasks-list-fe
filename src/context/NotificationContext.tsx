"use client";

import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

type Severity = "success" | "error" | "info" | "warning";

interface NotificationContextProps {
  notify: (message: string, severity?: Severity) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notify: () => {},
});

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Severity>("info");

  const notify = (msg: string, sev: Severity = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Top right
        sx={{
          mt: 2,
          mr: 2,
          "& .MuiAlert-root": {
            borderRadius: 2,
            boxShadow: 4,
            fontSize: "1.05rem",
            minWidth: 260,
            alignItems: "center",
          },
        }}
      >
        <MuiAlert
          elevation={8}
          variant="filled"
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{
            width: "100%",
            fontWeight: 500,
            letterSpacing: 0.2,
            bgcolor:
              severity === "success"
                ? "success.main"
                : severity === "error"
                ? "error.main"
                : severity === "warning"
                ? "warning.main"
                : "info.main",
          }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}