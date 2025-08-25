// src/components/Register.js
import React, { useState } from "react";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post("/api/auth/register", form);
      setMsg(data?.message || "✅ Registration successful! Now login.");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />
        <button type="submit">Create account</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
