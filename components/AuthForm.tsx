"use client";

import { register, login } from "@/lib/api";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Input from "./Input";

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
const AuthForm = ({ mode }) => {
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
    <Card className="">
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <div className="block bg-yellow">{error.message}</div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  autoComplete="first-name"
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  autoComplete="family-name"
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
           <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Username</div>
            <Input
              required
              autoComplete="username"
              placeholder="Username"
              value={formState.username}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, username: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              autoComplete="current-password"
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
           <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <button className="rounded-3xl font-bold hover:scale-110 active:scale-100 transition duration-200 ease-in-out bg-white text-black border-gray-400 hover:bg-gray-100 border-solid border-2 border-gray-800 text-lg px-6 py-2" type="submit">
                {content.buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Card>
    // return (
    // <div className="bg-body-color-light">
    //   test
    // </div>
  );
};

export default AuthForm;
