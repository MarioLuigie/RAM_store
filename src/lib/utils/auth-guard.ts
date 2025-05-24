import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import { AuthRole } from "../constants/enums";
import { ROUTES } from "../constants/paths";

export async function requireAdmin() {
  const session = await auth();

  if (session?.user?.role !== AuthRole.ADMIN) {
    redirect(ROUTES.UNAUTHORIZED);
  }

  return session;
}