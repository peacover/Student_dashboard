export const fetcher = async (
  url: string,
  method: string,
  body: any,
  json = true
) => {
  // console.log("sended data: ", url, method, JSON.stringify(body));
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = async (student: any) => {
  return await fetcher("/api/register", "POST", student, false);
};

export const login = async (student: any) => {
  return await fetcher("/api/login", "POST", student, false);
}