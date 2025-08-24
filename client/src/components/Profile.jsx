import { useAuthStore } from "../store/useAuthstore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 shadow
         "
        />
        <h2 className="text-xl font-semibold">{user.fullname}</h2>
        <p className="text-gray-600">{user.email}</p>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-4 !bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
