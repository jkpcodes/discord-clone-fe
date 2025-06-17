import { AppBar, Box, Paper } from '@mui/material';
import { styled,  } from '@mui/material/styles';

const ChannelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  margin: 0,
  padding: 0,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: 60,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 24,
  paddingRight: 24,
  boxSizing: 'border-box',
}));

const ChannelPageContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: 'calc(100% - 60px)',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
}));

const ChannelLayout = ({
  enableHeader = true,
  headerContent = null,
  children,
}) => {
  return (
    <ChannelContainer>
      {enableHeader && <StyledAppBar position='sticky' elevation={1}>{headerContent}</StyledAppBar>}
      <ChannelPageContainer elevation={4}>
        {children}
      </ChannelPageContainer>
    </ChannelContainer>
  );
};

export default ChannelLayout;
