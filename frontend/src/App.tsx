import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SelectPage from "./pages/SelectPage";
import BattlePage from "./pages/BattlePage";
import LeaderboardPage from "./pages/LeaderboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <Routes>
            {/* Public */}
            <Route path="/"         element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login"    element={<LoginPage />} />

            {/* Protected — requires login */}
            <Route path="/select"      element={<ProtectedRoute><SelectPage /></ProtectedRoute>} />
            <Route path="/battle"      element={<ProtectedRoute><BattlePage /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
