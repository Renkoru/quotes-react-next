import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PageLoadingIndicator from "./PageLoadingIndicator";
import UserMenu from "./UserMenu";
import { getSession } from "@lib/utils";

const appName = "Quotes";
const pages = [
  // {name: "UserQuotes", href: "/userquotes"},
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function NavBar() {
  const session = getSession();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {appName}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                open={false}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map(({ name, href }) => (
                  <Link key={name} href={href}>
                    <MenuItem>
                      <Typography sx={{ textAlign: "center" }}>
                        {name}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {appName}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ name, href }) => (
                <Link key={name} href={href}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {name}
                  </Button>
                </Link>
              ))}
            </Box>
            <UserMenu user={session?.user} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
// <PageLoadingIndicator />
