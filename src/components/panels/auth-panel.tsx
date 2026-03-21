"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { LockKeyhole, LogIn, LogOut, UserPlus } from "lucide-react";
import type { RuntimeStatus } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getBrowserSupabaseClient } from "@/lib/supabase";

type AuthMode = "signin" | "signup";

export function AuthPanel({ runtime }: { runtime: RuntimeStatus }) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState(
    runtime.authEnabled
      ? "Supabase auth is configured. Sign in or create an account."
      : "Supabase environment keys are missing, so auth actions are disabled.",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const client = getBrowserSupabaseClient();

    if (!client) {
      return;
    }

    void client.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit() {
    const client = getBrowserSupabaseClient();

    if (!client) {
      setMessage("Add Supabase keys to enable login and signup.");
      return;
    }

    setLoading(true);
    setMessage(mode === "signin" ? "Signing in..." : "Creating account...");

    try {
      const response =
        mode === "signin"
          ? await client.auth.signInWithPassword({ email, password })
          : await client.auth.signUp({ email, password });

      if (response.error) {
        setMessage(response.error.message);
        return;
      }

      setMessage(
        mode === "signin"
          ? "Signed in successfully."
          : "Signup request completed. Check your inbox if email confirmation is enabled.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    const client = getBrowserSupabaseClient();

    if (!client) {
      return;
    }

    setLoading(true);

    try {
      const response = await client.auth.signOut();

      if (response.error) {
        setMessage(response.error.message);
        return;
      }

      setMessage("Signed out.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TerminalPanel title="Access Control" subtitle="Supabase-backed email auth when configured">
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Session</p>
          <p className="mt-2 text-sm text-white">{session?.user.email ?? "No active user"}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{message}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.28em] ${
              mode === "signin"
                ? "border-cyan-400/35 bg-cyan-400/10 text-cyan-200"
                : "border-white/8 bg-white/[0.03] text-slate-400"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.28em] ${
              mode === "signup"
                ? "border-amber-400/35 bg-amber-400/10 text-amber-200"
                : "border-white/8 bg-white/[0.03] text-slate-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
              placeholder="trader@kratos.dev"
              disabled={!runtime.authEnabled || loading}
            />
          </label>
          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
              placeholder="••••••••"
              disabled={!runtime.authEnabled || loading}
            />
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={!runtime.authEnabled || loading}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {mode === "signin" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {loading ? "Working..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={!session || loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4">
          <div className="flex items-center gap-2 text-lime-200">
            <LockKeyhole className="h-4 w-4" />
            <span className="text-sm">Auth is environment gated</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-300">
            This panel performs real Supabase auth only when public env keys are available. Otherwise it stays read-only and reports exactly why.
          </p>
        </div>
      </div>
    </TerminalPanel>
  );
}

