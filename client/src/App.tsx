import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";



const App = () => {
  return (
   <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/dashboard" element={<Dashboard />} />

   </Routes>
  );
};

export default App;
