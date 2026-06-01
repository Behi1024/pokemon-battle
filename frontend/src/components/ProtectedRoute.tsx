import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import UnauthorizedPage from "../pages/UnauthorizedPage";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
}
