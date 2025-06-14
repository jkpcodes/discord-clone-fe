import { Avatar } from '@mui/material';

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
}) => {
    return (
      <Avatar {...stringAvatar(_id, variant, size, cursor, color)}>
        {icon ? icon : `${name[0].toUpperCase()}`}
      </Avatar>
    );

  // return (
  //   <Avatar {...stringAvatar(_id, name, size, cursor)} variant={variant} />
  // );
};

export default AppAvatar;
