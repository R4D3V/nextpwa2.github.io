"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/admin-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      router.push("/admin");
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="neu-card w-full max-w-sm p-8">
        <h1 className="font-display text-3xl text-navy">Admin Login</h1>
        <p className="mt-2 text-sm text-mist">Enter your password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="Password"
          className="neu-pressed mt-6 w-full rounded-xl px-4 py-3 text-sm text-navy outline-none placeholder:text-mist/50"
          autoFocus
        />
        {error && <p className="mt-2 text-xs text-red">Incorrect password.</p>}
        <button type="submit" className="neu-btn mt-4 w-full px-6 py-3 text-sm font-semibold text-red">
          Sign in
        </button>
      </form>
    </div>
  );
}
