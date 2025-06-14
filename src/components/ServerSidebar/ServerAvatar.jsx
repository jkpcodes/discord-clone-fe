import AppAvatar from '../common/AppAvatar';
import { IconButton, styled, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 45,
  height: 45,
  marginTop: 8,
  marginBottom: 8,
  '& > .MuiTouchRipple-root': {
    borderRadius: 0, // Make ripple square
    height: 60,
    width: 60,
    position: 'absolute',
    top: -8,
    left: -8,
  },
}));

const ServerAvatar = ({ _id, name, color = null }) => {
  return (
    <Tooltip
      title={name}
      placement='right'
      arrow
      slotProps={{
        tooltip: {
          sx: {
            fontWeight: 'bold',
            fontSize: 14,
          },
        },
      }}
    >
      <StyledIconButton size='large' component='button'>
        <AppAvatar
          _id={_id}
          name={name}
          size={45}
          cursor='pointer'
          icon={<PersonIcon />}
          variant='square'
          color={color}
          component='button'
        />
      </StyledIconButton>
    </Tooltip>
  );
};

export default ServerAvatar;
