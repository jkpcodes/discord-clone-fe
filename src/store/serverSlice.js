import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  /* Server object
    {
      _id,
      name,
      owner,
      members[],
      voiceChannel[], {_id, username, email, socketId}
    }
  */
  servers: [],
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServers: (state, action) => {
      state.servers = action.payload;
    },
    joinVoiceChannel: (state, action) => {
      // Find the server data
      const { voiceChannel } = state.servers.find(
        (server) => server._id === action.payload.serverId
      );

      // Check if the user is already in the voice channel
      if (
        !voiceChannel.find(
          (participant) => participant._id === action.payload.participant._id
        )
      ) {
        // Add the user to the voice channel
        voiceChannel.push(action.payload.participant);
      }

      // Exit the user from another server's voice channel
      state.servers.forEach((server) => {
        if (server._id !== action.payload.serverId) {
          server.voiceChannel = server.voiceChannel.filter(
            (participant) => participant._id !== action.payload.participant._id
          );
        }
      });
    },
    leaveVoiceChannel: (state, action) => {
      state.servers.find(
        (server) => server._id === action.payload.serverId
      ).voiceChannel = state.servers
        .find((server) => server._id === action.payload.serverId)
        .voiceChannel.filter(
          (participant) => participant._id !== action.payload.participantId
        );
    },
    exitUserFromAllVoiceChannels: (state, action) => {
      state.servers.forEach((server) => {
        server.voiceChannel = server.voiceChannel.filter(
          (participant) => participant._id !== action.payload
        );
      });
    },
    updateVoiceChannelParticipants: (state, action) => {
      const server = state.servers.find(
        (server) => server._id === action.payload.serverId
      );
      if (server) {
        server.voiceChannel = action.payload.voiceChannel;
      }
    },
    resetServerState: (state) => {
      state.servers = [];
    },
  },
});

export const {
  setServers,
  joinVoiceChannel,
  leaveVoiceChannel,
  exitUserFromAllVoiceChannels,
  updateVoiceChannelParticipants,
  resetServerState,
} = serverSlice.actions;
export default serverSlice.reducer;
