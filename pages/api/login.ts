import { comparePassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

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
    },
  });

  if (hash_password) {
    const is_pass_identical: any = await comparePassword(
      password,
      hash_password.password
    );
    if (is_pass_identical) {
      res.status(200).json({ message: "Login successfully" });
    } else res.status(400).json({ message: "Wrong Password!" });
  }
};

export default login;
