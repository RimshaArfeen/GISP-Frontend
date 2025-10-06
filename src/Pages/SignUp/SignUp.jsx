import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  try {
    const finalData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await fetch("api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(finalData)
    });

    // Check response content type
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("Backend returned:", text);
      throw new Error("Server returned an invalid response format");
    }

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `Signup failed with status ${response.status}`);
    }

    // Modified authentication check
    if (responseData.token || responseData.auth) {
      const token = responseData.token || responseData.auth;
      localStorage.setItem("token", token);
      
      if (responseData.user) {
        localStorage.setItem("Applicants", JSON.stringify(responseData.user));
        navigate(responseData.user.role === "admin" 
          ? "/adminDashboard" 
          : "/student/home");
      } else {
        navigate("/student/home"); // Fallback if no user data
      }
    } else {
      throw new Error("Authentication token not received from server");
    }
  } catch (error) {
    console.error("Sign up error:", error);
    alert(
      error.message.includes("Failed to fetch") 
        ? "Network error - check your connection"
        : error.message.includes("invalid response") 
          ? "Server configuration error"
          : error.message
    );
  }
};
  
  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-20">
        <h2 className="w-fit mx-auto text-center text-2xl font-bold heading-custom mb-6">
          Sign Up
          <div className='h-0.5 w-full bg-amber-600 my-1'></div>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-custom">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 4,
                  message: "Minimum length is 4 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
              })}
              className="w-full px-4 py-2 border-customborder-teal-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 border-[1px] border-teal-500 text-sm"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-custom">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                minLength: {
                  value: 4,
                  message: "Minimum length is 4 characters",
                },
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email format. Must contain '@' and domain",
                },
              })}
              className="w-full px-4 py-2 border-customborder-teal-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 border-[1px] border-teal-500 text-sm"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
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
              className="w-full px-4 py-2 border-customborder-teal-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 border-[1px] border-teal-500 text-sm"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-custom">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border-customborder-teal-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 border-[1px] border-teal-500 text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-custom mt-4">
          Already have an account?{" "}
          <a href="/" className="text-teal-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;