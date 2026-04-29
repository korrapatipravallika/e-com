import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthError, signupUser } from "../../features/auth/authSlice";
import { showDialog } from "../../features/ui/uiSlice";
import "./Signup.css";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const [localError, setLocalError] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSeller: true,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setLocalError("");
    dispatch(clearAuthError());
    setFormValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      setLocalError("Password and confirm password must be the same.");
      dispatch(
        showDialog({
          title: "Password mismatch",
          message: "Password and confirm password must be the same.",
          type: "error",
        })
      );
      return;
    }

    setLocalError("");

    const payload = {
      name: `${formValues.firstName} ${formValues.lastName}`.trim() || formValues.username,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      isSeller: formValues.isSeller,
    };

    dispatch(signupUser(payload))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div className="signup-page">
      <section className="signup-panel">
        <h2>Create Account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formValues.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formValues.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />

          <label className="signup-checkbox">
            <input
              type="checkbox"
              name="isSeller"
              checked={formValues.isSeller}
              onChange={handleChange}
            />
            <span>Join as Seller</span>
          </label>

          <button className="signup-button" type="submit" disabled={authStatus === "loading"}>
            {authStatus === "loading" ? "Please wait..." : "Sign Up"}
          </button>

          {localError ? <p className="form-error">{localError}</p> : null}
          {!localError && authError ? <p className="form-error">{authError}</p> : null}

          <p className="signup-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Signup;
