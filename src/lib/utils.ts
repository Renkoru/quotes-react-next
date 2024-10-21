import { cookies } from "next/headers";

export const SESSION_COOKIE_KEY = "mrsession";

export function getSession() {
  const cookie = cookies();
  console.log("TCL: [line 7][utils.ts] cookie: ", cookie.getAll());

  // TODO: add validation if cookie is no set
  if (!cookie.has(SESSION_COOKIE_KEY)) {
    return null;
  }
  console.log("REturn cookie", cookie.get(SESSION_COOKIE_KEY));

  return JSON.parse(cookie.get(SESSION_COOKIE_KEY)!.value);
}

export function setSession(data, expiresAt) {
  const cookie = cookies();

  cookie.set(SESSION_COOKIE_KEY, JSON.stringify(data), {
    expires: expiresAt! * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export function deleteSession() {
  const cookie = cookies();

  // TODO: add validation if cookie is no set
  cookie.delete(SESSION_COOKIE_KEY);
}
