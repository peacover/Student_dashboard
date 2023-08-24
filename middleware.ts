import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const validateJWT = async (token: any) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
  return payload;
};
const middleware = async (req: NextRequest) => {
  let token : string | undefined;
  if (req.cookies.has("student_access_token")){
    token = req.cookies.get("student_access_token")?.value;
  }
  if (req.nextUrl.pathname.startsWith("/login") && !token)
    return NextResponse.next();
  if (!token && req.nextUrl.pathname.startsWith("/home")){
    return NextResponse.redirect(new URL(`/login?${new URLSearchParams({
      error: "You are not logged in!"
    })}`, req.url));
    // req.nextUrl.pathname = "/login";
    // return NextResponse.redirect(req.nextUrl);
  }

  try{
    // console.log("new token: ", await validateJWT(token));
    await validateJWT(token);
    // return NextResponse.next();
  }
  catch(e){
    // return NextResponse.redirect(new URL(`/login?${new URLSearchParams({
    //   error: "Invalid Token! Try to login again :)"
    // })}`, req.url));
  }
};

export default middleware;
