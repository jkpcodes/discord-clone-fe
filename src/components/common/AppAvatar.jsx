import { Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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
}) => {
  // Add fallback for when name is undefined
  const avatarContent = icon || (name ? name[0].toUpperCase() : '?');

  return (
    <AvatarContainer>
      <Avatar {...stringAvatar(_id, variant, size, cursor, color)}>
        {avatarContent}
      </Avatar>
      {showName && (
        <Typography variant='body1' sx={{ fontSize: 18 }}>
          {name}
        </Typography>
      )}
    </AvatarContainer>
  );
};

export default AppAvatar;
