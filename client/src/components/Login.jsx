// import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthstore";
import { Loader2 } from "lucide-react";
function Login() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const { login, islogingUp } = useAuthStore();
  const validateForm = () => {
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
    const success = validateForm();
    if (success == true) {
      const logedup = await login(formdata);
      if (logedup) {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <p className="text-gray-600 mb-6">Sign in using Google or manually</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formdata.password}
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full !bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={islogingUp}
          >
            {islogingUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Login account"
            )}
          </button>
        </form>
        {/* <p className="m-5">or</p>
        <div className="my-4 ml-17 text-gray-500"> */}
        {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              navigate("/write");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Login;
