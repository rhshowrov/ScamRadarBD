import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./store/authSlice";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { isAuthenticated, loading, error, success } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(registerUser({ username, email, password, password2, mobile }));
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-200">
      <form
        className="card w-96 bg-base-100 shadow-xl p-8 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-center font-bold text-2xl mb-4">Sign Up</h2>
        <div className="form-control mb-2">
          <label className="label">
            {" "}
            <span className="label-text">Username</span>
          </label>
          <input
            className="input input-bordered w-full"
            required
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">
            {" "}
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-bordered w-full"
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">
            {" "}
            <span className="label-text">Password</span>
          </label>
          <input
            className="input input-bordered w-full"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">
            {" "}
            <span className="label-text">Confirm your password</span>
          </label>
          <input
            className="input input-bordered w-full"
            required
            type="password"
            placeholder="Retype password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">
            {" "}
            <span className="label-text">Mobile no</span>
          </label>
          <input
            className="input input-bordered w-full"
            required
            type="tel"
            placeholder="11 digit phone number"
            pattern="[01]{2}[0-9]{9}"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        {success && (
          <div role="alert" className="alert alert-success mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div role="alert" className="alert alert-error mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {/* Submit Button */}
        <div className="form-control">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <div className="flex flex-row mt-3">
          <p>Already have an Account?</p>
          <Link className="link" to="/login">
            Sign In{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
