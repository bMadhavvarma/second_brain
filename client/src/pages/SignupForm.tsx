import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate= useNavigate();
  const handleChange = (field: "username" | "password", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex-col w-1/4 border border-gray-300 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
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
          <div className="flex justify-center">
            <Button
              text="Sign Up"
              varient="primary"
              startIcon={<FaUser />}
              onClick={() => console.log("Signup Data:", formData)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
