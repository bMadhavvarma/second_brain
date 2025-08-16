import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";
import PublicBrain from "./pages/PublicBrain";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/signin" element={<SigninForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/brain/:shareLink" element={<PublicBrain />} />
      {/* catch-all route for unknown paths */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default App;
