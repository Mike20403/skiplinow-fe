import { ChatRoomCard } from '@/components/cards/ChatRoomCard';

export interface ChatRoomPageProps {}

export const ChatRoomPage = (props: ChatRoomPageProps) => {
  return (
    <>
      <div
        className={
          'caption-generate-page gap-4 flex flex-col justify-start pl-[10rem] md:pl-[20rem] lg:pl-[30rem] pr-[10rem] pt-[6rem]'
        }
      >
        <div className="chat-room flex flex-col gap-10 min-w-[25rem]">
          <h1 className={'text-4xl font-bold'}> Chat room</h1>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <ChatRoomCard />
            <ChatRoomCard />
          </div>
        </div>
      </div>
    </>
  );
};
