import AppAvatar from '../../common/AppAvatar';
import { ListItemButton, styled, Tooltip } from '@mui/material';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  // width: 45,
  // height: 45,
  // marginTop: 8,
  // marginBottom: 8,
  // width: '100%',
  // backgroundColor: theme.palette.background.default,
  paddingTop: 12,
  paddingBottom: 12,
}));

const ServerAvatar = ({
  _id,
  name,
  color = null,
  icon = null,
  isSelected = false,
  onClick,
}) => {
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
      <StyledListItemButton selected={isSelected} onClick={onClick}>
        <AppAvatar
          _id={_id}
          name={name}
          size={45}
          cursor='pointer'
          icon={icon}
          variant='square'
          color={color}
          component='button'
        />
      </StyledListItemButton>
    </Tooltip>
  );
};

export default ServerAvatar;
