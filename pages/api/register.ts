import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

interface RegisterBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  universityName: string;
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      let {
        firstName,
        lastName,
        username,
        password,
        universityName,
      }: RegisterBody = req.body;
      universityName = universityName.toLowerCase();
      const filter_username = await db.student.findUnique({
        where: {
          username: username,
        },
      });
      if (filter_username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      let filter_university = await db.university.findUnique({
        where: {
          name: universityName,
        },
      });
      if (!filter_university) {
        filter_university = await db.university.create({
          data: {
            name: universityName,
          },
        });
      }
      const hashedPassword = await hashPassword(password);
      const new_student = await db.student.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: hashedPassword,
          university: {
            connect: {
              id: filter_university.id,
            },
          },
        },
      });
      const jwt = await createJWT(new_student.id);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.JWT_COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(200).json({ message: "Register successfully" });
    } catch (error) {
      res.status(500).json({ message: "Student register failed" });
    }
  }

};

export default register;
