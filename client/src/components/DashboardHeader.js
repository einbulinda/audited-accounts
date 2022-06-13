import Box from "@mui/system/Box";
import { styled } from "@mui/material/styles";
import Menu from "@mui/icons-material/Menu";
import useWindowSize from "customHooks/useWindowSize";
import FlexBox from "components/FlexBox";
import Sidenav from "components/SideNav";
import { H2 } from "components/Typography";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  marginTop: theme.spacing(-2),
  marginBottom: theme.spacing(3),
  "& .headerHold": {
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  [theme.breakpoints.up("md")]: {
    "& .sidenav": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    "& .headerHold": {},
  },
}));

const DashboardHeader = ({ title, navigation, button, ...props }) => {
  const width = useWindowSize();
  const isTablet = width < 1025;
  return (
    <StyledBox>
      <FlexBox mt={2} className="headerHold">
        <FlexBox alignItems="center">
          {props.icon && <props.icon color="error" fontSize="large" />}
          <H2 ml={1.5} my="0px" lineHeight="1" whiteSpace="pre">
            {title}
          </H2>
        </FlexBox>
        {/* isTablet Menu Icon */}
        <Box className="sidenav">
          <Sidenav position="left" handle={<Menu fontSize="small" />}>
            {navigation}
          </Sidenav>
        </Box>
        {!isTablet && button}
      </FlexBox>
      {isTablet && !!button && <Box mt={2}>{button}</Box>}
    </StyledBox>
  );
};

export default DashboardHeader;
