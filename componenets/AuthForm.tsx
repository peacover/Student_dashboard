"use client";
import { register, login } from "@/lib/api";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const registerContent = {
  linkUrl: "/login",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const loginContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Login",
};

const initial = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  universityName: "",
};

export interface IAuthForm {
  mode: "register" | "login";
}
const AuthForm: React.FC<IAuthForm> = ({ mode }) => {
  const [formState, setFormState] = useState(initial);
  const [error, setError] = useState(Error());

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        if (mode === "register") {
          await register(formState);
        } else if (mode === "login") {
          await login(formState);
        }

        router.replace("/home");
      } catch (e) {
        setError(e);
      } finally {
        setFormState({ ...initial });
      }
    },
    [
      formState.firstName,
      formState.lastName,
      formState.password,
      formState.username,
      formState.universityName,
    ]
  );

  const content = mode === "register" ? registerContent : loginContent;
  
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="block bg-yellow">{error.message}</div>
      <div className="w-1/3 bg-primary">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col rounded-lg"
        >
          <div className="text-center">
            <h2 className="text-3xl mb-2">{content.header}</h2>
            <p className="tex-lg text-black/25">{content.subheader}</p>
          </div>
          {mode === "register" && (
            <div className="">
              <label className="text-lg mb-4 ml-2 text-black/50">
                First Name
              </label>
              <input
                required
                placeholder="First Name"
                value={formState.firstName}
                className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                onChange={(e) =>
                  setFormState((s) => ({ ...s, firstName: e.target.value }))
                }
              />
              <div className="mb-8">
                <label className="text-lg mb-4 ml-2 text-black/50">
                  Last Name
                </label>
                <input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
              <div className="mb-8">
                <label className="text-lg mb-4 ml-2 text-black/50">
                  University
                </label>
                <input
                  required
                  placeholder="University"
                  value={formState.universityName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      universityName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <label className="text-lg mb-4 ml-2 text-black/50">Username</label>
            <input
              required
              placeholder="Username"
              value={formState.username}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, username: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <label className="text-lg mb-4 ml-2 text-black/50">Password</label>
            <input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>

          <span>
            <Link href={content.linkUrl} className="text-blue-600 font-bold">
              {content.linkText}
            </Link>
          </span>
          <div className="mx-auto">
            <button type="submit">{content.buttonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
