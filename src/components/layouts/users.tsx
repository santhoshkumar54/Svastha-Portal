import * as React from "react";

import {
  Avatar,
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

import Cookies from "js-cookie";
import UserCreateDialog from "./user-create";
import { deepOrange } from "@mui/material/colors";
import { fetchUsers } from "../../services/user-service";
import { useNavigate } from "react-router-dom";
import { user } from "../../model/user-model";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Ecoharvest
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Users() {
  const navigate = useNavigate();
  const sessionCookie = Cookies.get('auth');
  const sessionUser = JSON.parse(sessionCookie??"{}");
  
  const [userData, setUserData] = React.useState<user[]>([]);
  const handleLogout = () => {
    Cookies.remove('auth');
    navigate('/'); 
  }

  const handleRefresh = () => {
    fetchUsers().then((result) => {
      setUserData(result);
    });
  };

  React.useEffect(() => {
    handleRefresh();
  }, []);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              User List
            </Typography>
            <IconButton onClick={handleLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {sessionUser &&
                sessionUser.first_name.substring(0, 1).toUpperCase()}
            </Avatar>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </React.Fragment>
            {/* <Divider sx={{ my: 1 }} /> */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <React.Fragment>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      Users
                    </Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Username</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Created At</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userData.map((row) => (
                          <TableRow key={row.pk1}>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.roles?.role}</TableCell>
                            <TableCell>{row.phone_number}</TableCell>
                            <TableCell>{row?.createddt}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* <Link
                      color="primary"
                      href="#"
                      //   onClick={preventDefault}
                      sx={{ mt: 3 }}
                    >
                      Add New User
                    </Link> */}
                  </React.Fragment>
                </Paper>
                <UserCreateDialog onClose={handleRefresh} />
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
