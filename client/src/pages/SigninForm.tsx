import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: "username" | "password", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/signin", {
        userName: formData.username,
        password: formData.password,
      });

      const { token, data } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Signin failed";
        setError(message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex-col w-1/4 border border-gray-300 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}

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
                className="absolute right-3 top-2 text-sm text-blue-600 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              text={loading ? "Signing In..." : "Sign In"}
              varient="primary"
              startIcon={<FaSignInAlt />}
              
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
