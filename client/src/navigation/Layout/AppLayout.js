import { Container, Grid } from "@mui/material";
import React from "react";
import SideNav from "../../components/SideNav";

const AppLayout = ({ children }) => {
  return (
    <Container maxWidth="xl" sx={{ my: "2rem" }}>
      <Grid container spacing={3}>
        <Grid
          item
          lg={3}
          xs={12}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <SideNav />
        </Grid>
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppLayout;
