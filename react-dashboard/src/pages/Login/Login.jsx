import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthError, loginUser } from "../../features/auth/authSlice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const authToken = useSelector((state) => state.auth.token);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authToken) {
      navigate("/products");
    }
  }, [authToken, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(clearAuthError());
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formValues));
  };

  return (
    <div className="login-page">
      <section className="login-panel">
        <h2>Welcome Back</h2>

        <form className="login-form" onSubmit={handleSubmit}>
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

          <button className="login-button" type="submit" disabled={authStatus === "loading"}>
            {authStatus === "loading" ? "Please wait..." : "Login"}
          </button>

          {authError ? <p className="form-error">{authError}</p> : null}

          <p className="login-footer">
            New here? <Link to="/signup">Create account</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Login;
