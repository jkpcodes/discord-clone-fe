import ChatLayout from '../../components/Chat/ChatLayout';
import FriendChatHeader from '../../components/Channel/Friends/FriendChatHeader';

const ChatPage = () => {
  return (
    <ChatLayout enableHeader={true} headerContent={<FriendChatHeader />}>
    </ChatLayout>
  );
};

export default ChatPage;
