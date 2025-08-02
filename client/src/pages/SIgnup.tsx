import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaUser, FaSignInAlt } from "react-icons/fa";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: "username" | "password", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isSignup ? "Signup Data:" : "Signin Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
    <div className=" flex-col  w-1/4 border border-gray-300 rounded-lg p-8 shadow-md ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(val) => handleChange("username", val)}
        />

        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-center cursor-pointer top-2 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="flex justify-center "> 
       <Button
          text={isSignup ? "Sign Up" : "Sign In"}
          varient="primary"
          startIcon={isSignup ? <FaUser /> : <FaSignInAlt />}
          onClick={() => {
            console.log(isSignup ? "Signup Data:" : "Signin Data:", formData);
          }}
        /> 
        </div>
      </form>

      <p className="mt-6 text-center text-sm">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsSignup((prev) => !prev)}
          className="text-blue-600 cursor-pointer underline"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>

    </div>

  );
};

export default AuthForm;
