import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AppAvatar from '../../common/AppAvatar';

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  maxHeight: 480,
  bgcolor: 'background.paper',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingRight: 0,
  paddingLeft: 0,
  padding: 0,
}));

const SelectMembers = ({ members, onMembersChange, disabled }) => {
  const friends = useSelector((state) => state.friend.friends);

  return (
    <StyledList>
      {friends.map((friend) => (
        <StyledListItem
          key={friend._id}
          secondaryAction={
            <Checkbox
              edge='start'
              checked={members.indexOf(friend._id) !== -1}
              onChange={() =>onMembersChange(friend._id)}
              disabled={disabled}
            />
          }
        >
          <ListItemButton sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            onClick={() => onMembersChange(friend._id)}
            disabled={disabled}
          >
            <AppAvatar _id={friend._id} name={friend.username} size={30}/>
            <ListItemText primary={friend.username} />
          </ListItemButton>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default SelectMembers;
