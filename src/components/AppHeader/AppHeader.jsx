import {
  Box,
  AppBar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import AppAvatar from '../common/AppAvatar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutHandler } from '../../services/auth';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: 48,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  padding: '0 16px',
  '--Paper-overlay': 'none !important',
}));

const AppHeader = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logoutHandler();
  };

  return (
    <StyledAppBar>
      <Box></Box>
      <Box></Box>

      {/* User Menu */}
      {userDetails && (
        <Box>
          <Tooltip title='User Settings' placement='bottom'>
            <IconButton onClick={handleOpenUserMenu}>
              <AppAvatar
                size={30}
                _id={userDetails._id}
                name={userDetails.username}
                cursor='pointer'
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '36px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign='center'>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </StyledAppBar>
  );
};

export default AppHeader;
