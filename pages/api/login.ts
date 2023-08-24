import { comparePassword, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  const is_username = await db.student.findUnique({
    where: {
      username: username,
    },
  });
  if (!is_username) {
    res.status(400).json({ message: "Username does not exist" });
  }
  const hash_password = await db.student.findUnique({
    where: {
      username: username,
    },
    select: {
      password: true,
      id: true
    },
  });

  if (hash_password) {
    const is_pass_identical: any = await comparePassword(
      password,
      hash_password.password
    );
    if (is_pass_identical) {
      const jwt = await createJWT(hash_password.id);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.JWT_COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(200).json({ message: "Login successfully" });
    } else res.status(400).json({ message: "Wrong Password!" });
  }
};

export default login;
