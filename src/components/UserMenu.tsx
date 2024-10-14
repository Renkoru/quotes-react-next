"use client"

import Box from '@mui/material/Box';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { signOut } from "next-auth/react"
import { Loop } from '@mui/icons-material';


export default function UserMenu() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    setAnchorEl(null);
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          animation: "spin 2s linear infinite",
          "@keyframes spin": {
            "0%": {
              transform: "rotate(360deg)",
            },
            "100%": {
              transform: "rotate(0deg)",
            },
          }
        }}
      >
        <Loop sx={{verticalAlign: "middle"}} />
      </Box>
    );

 } 

  if (!session?.user) {
    return (
      <Link href="/signin">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          Sign In
        </Button>
      </Link>
    );
  } 

  const userName = session.user.name || "";

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={userName}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{userName[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}
 

// export default function AccountMenu() {
//   return (
  // );
// }
