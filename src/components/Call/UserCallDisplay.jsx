import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '50%',
  height: '50%',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
}));

const UserCallDisplay = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };

  }, [stream]);

  return <StyledBox>
    <StyledCard>
      <CardMedia
        component='video'
        alt='User Call Display'
        ref={videoRef}
        autoPlay
        muted={isLocalStream}
      />
    </StyledCard>
  </StyledBox>;
};

export default UserCallDisplay;
