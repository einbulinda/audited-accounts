import DashboardHeader from "components/DashboardHeader";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AppLayout from "navigation/Layout/AppLayout";
import { CustomLink } from "components/CustomLink";
import { url } from "navigation/CONSTANTS";
import {
  Button,
  Card,
  FormHelperText,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import profileSchema from "validations/profileSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { businessTypes, yearEnds } from "data";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onCreateProfile } from "api";
import { createProfile } from "redux/slices/companyProfileSlice";

const AddProfile = () => {
  const [bizType, setBizType] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  const dispatch = useDispatch();

  const handleProfileSubmit = async (profile, { resetForm }) => {
    profile.type = bizType;
    profile.yearEnd = yearEnd;

    try {
      const { data } = await onCreateProfile(profile);

      dispatch(createProfile(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppLayout>
      <DashboardHeader
        title="Add Business Profile"
        icon={BusinessCenterIcon}
        button={
          <CustomLink path={url.PROFILES}>
            <Button variant="contained" color="error" sx={{ px: "2rem" }}>
              All Profiles
            </Button>
          </CustomLink>
        }
      />
      <Card sx={{ p: "3rem" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={handleProfileSubmit}
        >
          <Form>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                {" "}
                <Field
                  name="name"
                  label="Company Name"
                  placeholder="XYZ Limited"
                  fullWidth
                  as={TextField}
                />
                <ErrorMessage
                  component={FormHelperText}
                  error={true}
                  size="large"
                  sx={{ ml: 1 }}
                  name="name"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="type"
                      label="Business Type"
                      placeholder="Company"
                      fullWidth
                      select
                      value={bizType}
                      as={TextField}
                      onChange={(e) => setBizType(e.target.value)}
                    >
                      {businessTypes.map((type) => {
                        const { code, name } = type;
                        return (
                          <MenuItem value={code} key={code}>
                            {name}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      component={FormHelperText}
                      error={true}
                      size="large"
                      sx={{ ml: 1 }}
                      name="type"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="yearEnd"
                      label="Accounting Period"
                      placeholder="December"
                      fullWidth
                      select
                      value={yearEnd}
                      as={TextField}
                      onChange={(e) => setYearEnd(e.target.value)}
                    >
                      {yearEnds.map((month) => {
                        const { code, period } = month;
                        return (
                          <MenuItem value={code} key={code}>
                            {period}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      component={FormHelperText}
                      error={true}
                      size="large"
                      sx={{ ml: 1 }}
                      name="yearEnd"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={6} xs={12}>
                {" "}
                <Field
                  name="pin"
                  label="KRA PIN"
                  placeholder="P123456789Z"
                  fullWidth
                  as={TextField}
                />
                <ErrorMessage
                  component={FormHelperText}
                  error={true}
                  size="large"
                  sx={{ ml: 1 }}
                  name="pin"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Grid container spacing={2}>
                  <Grid item sm={4} xs={12}>
                    <Field
                      name="shares"
                      label="Total Shares"
                      placeholder="100"
                      fullWidth
                      as={TextField}
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      error={true}
                      size="large"
                      sx={{ ml: 1 }}
                      name="shares"
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Field
                      name="paidUp"
                      label="Paid Up Shares"
                      placeholder="100"
                      fullWidth
                      as={TextField}
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      error={true}
                      size="large"
                      sx={{ ml: 1 }}
                      name="paidUp"
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Field
                      name="nominal"
                      label="Nominal Value"
                      placeholder="1,000"
                      fullWidth
                      as={TextField}
                    />
                    <ErrorMessage
                      component={FormHelperText}
                      error={true}
                      size="large"
                      sx={{ ml: 1 }}
                      name="nominal"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack my={3} justifyContent="center" spacing={3} direction="row">
              <Button variant="contained" color="primary" type="submit">
                Save Profile
              </Button>
              <Button variant="contained" color="secondary" type="reset">
                Clear Form
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Card>
    </AppLayout>
  );
};

export default AddProfile;

const initialValues = {
  name: "",
  pin: "",
  type: "",
  yearEnd: "",
  shares: "",
  paidUp: "",
  nominal: "",
};
