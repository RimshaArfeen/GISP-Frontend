
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data, role) => {
    try {
      const finalData = { ...data, role };
      const result = await fetch("https://sample-backend-topaz.vercel.app//login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData)
      });

      const responseData = await result.json();

      if (responseData.auth && responseData.user?.role === role) {
        localStorage.setItem("Applicants", JSON.stringify(responseData.user));
        localStorage.setItem("token", responseData.auth);

        if (role === "student") {
          navigate("/home");
        } else if (role === "admin") {
          navigate("/adminDashboard");
        }
      } else {
        alert("Invalid credentials or role mismatch");
      }
    } catch (error) {
      console.log("Login failed:", error.message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form className="w-full md:w-2/3 lg:w-3/4 space-y-4">
        {/* Email */}
        <div>
          <label className="block text-custom">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email format",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none border-custom"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-custom">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none border-custom"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-custom">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none border-custom"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Login as Student */}
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, "student"))}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Log In As Student
        </button>

        {/* Login as Admin */}
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, "admin"))}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Log In As Admin
        </button>
      </form>
    </div>
  );
};

export default Login;
