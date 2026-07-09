import { getCurrentUser } from "../repositories/auth.repository";

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function getOptionalCurrentUser() {
  return await getCurrentUser();
}
