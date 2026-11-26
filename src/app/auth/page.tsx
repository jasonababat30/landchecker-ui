
"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { login, register } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { getToken } from "@/lib/auth-storage";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/");
    }
  }, [router]);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    let submitStatus = "pending";

    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({ email, password });
      }

      submitStatus = "success";
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      submitStatus = "failed";
      if (axios.isAxiosError(err)) {
        const responseError = err.response?.data?.error;
        const responseErrors = err.response?.data?.errors;

        if (typeof responseError === "string") {
          setError(responseError);
        } else if (Array.isArray(responseErrors)) {
          setError(responseErrors.join(", "));
        } else {
          setError(
            err.response?.status === 422
              ? "Please check your email and password."
              : "Unable to authenticate. Check your connection and try again.",
          );
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      if (submitStatus === "success") {
        setEmail("")
        setPassword("")
        setMode("login")
      }
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Landchecker
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {mode === "login"
              ? "Sign in to manage your saved properties."
              : "Create an account to start saving properties."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              mode === "login"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError(null);
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              mode === "register"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-r-lg"
              >
                {showPassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </button>
            </div>

            {
              mode === "register" &&
              (
                <p className="mt-2 text-xs text-gray-500">
                  Use at least 8 characters.
                </p>
              )
            }
          </div>


          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Log in"
                : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}
