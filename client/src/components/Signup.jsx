import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthstore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
export function Signup() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formdata.fullname.trim()) return toast.error("full name is required");
    if (!formdata.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formdata.email))
      return toast.error("Ivalid email");
    if (!formdata.password.trim()) return toast.error("password is required");
    if (formdata.password.length < 6)
      return toast.error("password should have 6 letters ");
    console.log(formdata);
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = validateForm();
      if (success) {
        const signedup = await signup(formdata);
        if (signedup) {
          navigate("/login");
          return;
        } else {
          console.log("Signup failed");
        }
      } else {
        console.error("Form validation failed");
      }
    } catch (error) {
      console.log("An error occurred during signup:", error);
    }
  };

  return (
    <div className="h-180 flex justify-center items-center mb-10  ">
      <div className="lg:w-[calc(100dvw-50rem)] md:w-[calc(100dvw-15rem)] mt-1 ml-5  flex flex-col justify-center items-center p-4 sm:p-12 border-1 border-black rounded-3xl ">
        <div className="w-full max-w-wd space-y-10 ">
          {/** LOGO*/}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className=" size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors "></div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-boarded w-full pl-10  p-3 m-2`}
                  placeholder="John de.."
                  value={formdata.fullname}
                  onChange={(e) =>
                    setFormdata({ ...formdata, fullname: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-boarded w-full pl-10  p-3 m-2`}
                  placeholder="@example.com"
                  value={formdata.email}
                  onChange={(e) =>
                    setFormdata({ ...formdata, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-boarded w-full pl-10  p-3 m-2`}
                  placeholder="@example.com"
                  value={formdata.password}
                  onChange={(e) =>
                    setFormdata({ ...formdata, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="rounded-xl h-10 w-full mt-3 mb-2 bg-blue-500"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>
          <div className="text-center -mt-10">
            <p className="text-base-content/60">
              Already have?
              <Link to="/login" className="text-blue-600">
                Sign in{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
