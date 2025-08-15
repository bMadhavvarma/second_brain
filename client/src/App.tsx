import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";
import PublicBrain from './pages/PublicBrain.tsx';



const App = () => {
  return (
   <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/:shareLink" element={<PublicBrain />} />

   </Routes>
  );
};

export default App;
