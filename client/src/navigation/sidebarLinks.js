import { url } from "./CONSTANTS";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MoneyIcon from "@mui/icons-material/Money";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

export const sidebarLinks = [
  {
    path: url.DASHBOARD,
    title: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: url.ADD_PROFILE,
    title: "Add Profile",
    icon: AssignmentIndIcon,
  },
  {
    path: url.EDIT_PROFILE,
    title: "Edit Profile",
    icon: ManageAccountsIcon,
  },
  {
    path: url.VAT_RETURN,
    title: "VAT Data",
    icon: AccountTreeIcon,
  },
  {
    path: url.PAYE_RETURNS,
    title: "PAYE Data",
    icon: MoneyIcon,
  },
  {
    path: url.EXPENSES,
    title: "Expenses",
    icon: MoneyOffIcon,
  },
];
// Have menu for accounts having the different sets of books as drop down menus
