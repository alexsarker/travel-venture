import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const { createUser, googleLogin, githubLogin, currentUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [regError, setRegError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    console.log(name, photo, email, password);

    setRegError("");

    if (password.length < 6) {
      setRegError("Password should be at least 6 characters or longer.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegError("Password should be at least one Uppercase character.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setRegError("Password should be at least one Lowercase character.");
      return;
    }

    // create User
    createUser(email, password)
      .then((result) => {
        currentUserProfile(name, photo);
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="hero pt-4">
        <div className="py-10 px-16 border rounded-md">
          <div className="text-left pb-8">
            <h1 className="text-2xl font-bold">Register</h1>
          </div>
          <div className="card w-96">
            <form onSubmit={handleRegister}>
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered text-sm"
                  required
                />
              </div>
              {/* photoURL */}
              <div className="form-control pt-2">
                <label className="label">
                  <span className="label-text font-medium text-base">
                    PhotoURL
                  </span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="photoURL"
                  className="input input-bordered text-sm"
                  required
                />
              </div>
              {/* Email */}
              <div className="form-control pt-2">
                <label className="label">
                  <span className="label-text font-medium text-base">
                    Email address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered text-sm"
                  required
                />
              </div>
              {/* Password */}
              <div className="form-control pt-2">
                <label className="label">
                  <span className="label-text font-medium text-base">
                    New Password
                  </span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="grow text-sm"
                    placeholder="New Password"
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <IoEyeOffOutline className="text-xl" />
                    ) : (
                      <IoEyeOutline className="text-xl" />
                    )}
                  </span>
                </label>
              </div>
              {/* button */}
              <div className="form-control mt-6">
                <button className="btn back-yellow">Register</button>
              </div>
              {regError && (
                <p className="text-red-700 pt-4 text-center">{regError}</p>
              )}

              {/* login button */}
              <p className="text-center pt-6 font-medium mb-6">
                Already have an account?{"  "}
                <Link to="/login">
                  <span className="label-text-alt font-bold yellow text-sm link link-hover pt-2">
                    Login
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="divider text-center font-bold py-4 w-96">Or</div>
        </div>
        {/* more button */}
        <div className="flex justify-center">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                googleLogin();
              }}
              className="btn btn-ghost border border-[#C7C7C7] px-40 rounded-full flex items-center gap-4 hover:bg-[#f9a51a]"
            >
              <FcGoogle className="text-2xl" />
              Register with Google
            </button>
            <button
              onClick={() => {
                githubLogin();
              }}
              className="btn btn-ghost border border-[#C7C7C7] px-40 rounded-full flex items-center gap-4 hover:bg-[#f9a51a]"
            >
              <RxGithubLogo className="text-2xl" />
              Register with Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
