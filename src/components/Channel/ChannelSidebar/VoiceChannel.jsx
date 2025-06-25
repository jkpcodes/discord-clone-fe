import { Typography, List, ListItemText, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { joinVoiceChannel } from '../../../store/serverSlice';
import VoiceCallParticipant from './VoiceCallParticipant';
import { setIsUserInCall } from '../../../store/callSlice';
import { joinServerVoiceChannel } from '../../../services/socket';
import { getLocalStreamPreview } from '../../../services/webRTC';

const StyledList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const VoiceChannel = () => {
  const dispatch = useDispatch();
  const { servers } = useSelector((state) => state.server);
  const { id } = useParams();
  const { userDetails } = useSelector((state) => state.auth);
  const server = servers.find((server) => server._id === id);

  const handleJoinVoiceChannel = () => {
    getLocalStreamPreview(false, () => {
      dispatch(
        joinVoiceChannel({
          serverId: id,
          participant: { _id: userDetails._id, username: userDetails.username },
        })
      );
      dispatch(setIsUserInCall(true));
      joinServerVoiceChannel(id);
    });
  };

  return (
    <StyledList>
      {server && (
        <>
          <ListItemButton
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            onClick={handleJoinVoiceChannel}
          >
            <VolumeUpIcon />
            {server.voiceChannel ? (
              <ListItemText
                primary={`Voice Channel ${server.voiceChannel.length} / 4`}
              />
            ) : (
              <ListItemText primary='Voice Channel' />
            )}
          </ListItemButton>
          {/* Voice channel participants */}
          {server.voiceChannel.map((participant) => (
            <VoiceCallParticipant
              key={participant._id}
              participant={participant}
            />
          ))}
        </>
      )}
    </StyledList>
  );
};

export default VoiceChannel;
