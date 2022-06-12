import "./UserStyles.scss";
import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const UserSlice = () => {
  const [signIn, setSignIn] = useState(false);

  const userSignIn = (data, { resetForm }) => {
    const { email, password } = data;

    console.log(email, password);
  };

  const registerUser = (data, { resetForm }) => {};

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
              setSignIn(true);
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
              setSignIn(false);
            }}
          >
            Create Account
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default UserSlice;

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
