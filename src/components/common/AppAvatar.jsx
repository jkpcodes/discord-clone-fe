import { Avatar, Typography, Box, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Fragment } from 'react';

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
}));

function stringToColor(_id) {
  let hash = 0;
  let i;

  for (i = 0; i < _id.length; i += 1) {
    hash = _id.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(_id, variant, size, cursor, color) {
  return {
    sx: {
      bgcolor: color ? color : stringToColor(_id),
      width: size,
      height: size,
      cursor: cursor,
      borderRadius: variant === 'square' ? 2 : 100,
      color: 'white',
    },
  };
}

const AppAvatar = ({
  _id,
  name,
  size = 30,
  cursor = 'default',
  variant = 'circular',
  color = null,
  icon = null,
  showName = false,
  isOnline = false,
  showBadge = false,
}) => {
  // Add fallback for when name is undefined
  const avatarContent = icon || (name ? name[0].toUpperCase() : '?');

  const avatarElement = (
    <Avatar {...stringAvatar(_id, variant, size, cursor, color)}>
      {avatarContent}
    </Avatar>
  );

  return (
    <AvatarContainer>
      {showBadge && (
        <Badge
          color='success'
          variant='dot'
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            '& .MuiBadge-badge': {
              width: 10,
              height: 10,
              backgroundColor: isOnline ? 'green' : 'gray',
            },
          }}
        >
          {avatarElement}
        </Badge>
      )}
      {!showBadge && avatarElement}
      {showName && (
        <Typography variant='body1' sx={{ fontSize: 18 }}>
          {name}
        </Typography>
      )}
    </AvatarContainer>
  );
};

export default AppAvatar;
