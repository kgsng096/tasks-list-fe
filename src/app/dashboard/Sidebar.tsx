"use client";

import * as React from "react";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Toolbar,
  Box,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

const drawerWidth = 240;

export default function Sidebar({
  open,
  anchor = "left",
}: {
  open: boolean;
  anchor?: "left" | "right";
}) {
  return (
    <Drawer
      variant="persistent"
      open={open}
      anchor={anchor}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1a202c",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <List sx={{ flex: 1 }}>
          <ListItem button component={Link} href="/profile">
            <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
              <BadgeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </List>
        <Box>
          <Divider sx={{ bgcolor: "#374151" }} />
          <List>
            <ListItem button component={Link} href="/logout">
              <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
