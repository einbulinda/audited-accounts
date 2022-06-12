import "./UserStyles.scss";
import { Button, FormHelperText, Grid, Paper, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { url } from "../../navigation/CONSTANTS";
import { onRegistration, onLogin } from "../../api";
import { authenticateUser } from "../../redux/slices/authSlice";

const UserAuthPage = () => {
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userSignIn = async (data, { resetForm }) => {
    const { email, password } = data;

    try {
      await onLogin({ email, password });
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const registerUser = async (regData, { resetForm }) => {
    try {
      const { data } = await onRegistration(regData);
      setError("");
      setSuccess(data.message);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setSuccess("");
    }
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
    if (success) setTimeout(navigate(url.DASHBOARD), 2000); //This might be creating many calls to history API [12/06/2022_einbulinda]
  }, [location, navigate, success]);

  return (
    <div className="container">
      <main className={signIn ? "slideRight" : ""}>
        {signIn ? (
          <div className="form signInForm">
            {/* Sign In Form */}
            <Formik
              onSubmit={userSignIn}
              validationSchema={signInSchema}
              initialValues={{ email: "", password: "" }}
            >
              <Form>
                <h2>Sign In</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      name="email"
                      fullWidth
                      label="Email"
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      fullWidth
                      error={true}
                      size="large"
                      name="email"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      name="password"
                      fullWidth
                      label="Password"
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      fullWidth
                      error={true}
                      size="large"
                      name="password"
                    />
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      margin: "1em auto",
                      borderRadius: "1.2em",
                      padding: "1em 3.5em",
                      backgroundColor: "#097969",
                      ":hover": {
                        backgroundColor: "#09ceb0",
                        color: "#030303",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Form>
            </Formik>
            <Paper sx={{ color: "green", margin: "10px 0" }}>{success}</Paper>
            <Paper sx={{ color: "red", margin: "1rem 1.5rem" }}>{error}</Paper>
          </div>
        ) : (
          <div className="form signUpForm">
            {/* Sign up Form */}
            <Formik
              onSubmit={registerUser}
              validationSchema={registerSchema}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
            >
              <Form>
                <h2>Create Account</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="firstName"
                      fullWidth
                      label="First Name"
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      fullWidth
                      error={true}
                      size="large"
                      name="firstName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="lastName"
                      fullWidth
                      label="Last Name"
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      fullWidth
                      error={true}
                      size="large"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      name="email"
                      fullWidth
                      label="Email"
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      fullWidth
                      error={true}
                      size="large"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="password"
                      fullWidth
                      label="Password"
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      fullWidth
                      error={true}
                      size="large"
                      name="password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      fullWidth
                      label="Confirm Password"
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      fullWidth
                      error={true}
                      size="large"
                      name="confirmPassword"
                    />
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      margin: "1em auto",
                      borderRadius: "1.2em",
                      padding: "1em 3.5em",
                      backgroundColor: "#097969",
                      ":hover": {
                        backgroundColor: "#09ceb0",
                        color: "#030303",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Form>
            </Formik>
            <Paper sx={{ color: "green", margin: "10px 0" }}>{success}</Paper>
            <Paper sx={{ color: "red", margin: "1rem 1.5rem" }}>{error}</Paper>
          </div>
        )}
      </main>
      <aside className={signIn ? "slideLeft" : ""}>
        {/* Sign in Block Aside */}
        <div className="sign-in-block">
          <h2>Already a User?</h2>
          <Button
            type="submit"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              padding: "1em 3.5em",
            }}
            onClick={() => {
              navigate(url.LOGIN);
            }}
          >
            Login
          </Button>
        </div>

        {/* Sign Up Block Aside */}
        <div className="sign-up-block">
          <h2>New User?</h2>
          <Button
            type="submit"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              padding: "1em 3.5em",
            }}
            onClick={() => {
              navigate(url.REGISTER);
            }}
          >
            Create Account
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default UserAuthPage;

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .max(255)
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const registerSchema = Yup.object().shape({});
