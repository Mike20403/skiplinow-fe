import { ChatRoomCard } from '@/components/cards/ChatRoomCard';
import { Button } from '@/components/ui/button';

export interface ChatRoomPageProps {}

export const ChatRoomPage = (props: ChatRoomPageProps) => {
  const handleCreateRoom = () => {};
  return (
    <>
      <div
        className={
          'caption-generate-page gap-4 flex flex-col justify-start pl-[10rem] md:pl-[20rem] lg:pl-[30rem] pr-[10rem] pt-[6rem]'
        }
      >
        <div className="chat-room flex flex-col gap-10 min-w-[25rem]">
          <div className="flex flex-row justify-between">
            <h1 className={'text-4xl font-bold'}> Chat room</h1>
            <Button onClick={handleCreateRoom}>Create a room</Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <ChatRoomCard />
            <ChatRoomCard />
          </div>
        </div>
      </div>
    </>
  );
};
