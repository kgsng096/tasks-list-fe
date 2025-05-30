"use client";

import * as React from "react";
import { TextField, Button, Alert, MenuItem } from "@mui/material";

type Role = {
  id: number;
  name: string;
};

interface RegisterFormProps {
  roles: Role[];
  onSuccess: () => void;
}

export default function RegisterForm({ roles, onSuccess }: RegisterFormProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<number | "">("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: registerEmail,
          role: selectedRole,
          password: registerPassword,
        }),
      });
      const data = await res.json();

      if (res.ok && (data.success || data.registered)) {
        setSuccess(true);
        onSuccess();
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Registration successful! You can now log in.
        </Alert>
      )}
      <TextField
        label="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={registerEmail}
        onChange={e => setRegisterEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        select
        label="Role"
        value={selectedRole}
        onChange={e => setSelectedRole(Number(e.target.value))}
        fullWidth
        required
        margin="normal"
      >
        {roles.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Password"
        type="password"
        value={registerPassword}
        onChange={e => setRegisterPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}