import { ChatMember } from '@/models/chatroom.model';
import { useState } from 'react';

export interface ChatRoomCardProps {
  key: string | number;
  imageUrl?: string;
  title?: string;
  owner?: ChatMember;
  active?: number | string;
  total?: number | string;
  handleClick?: () => void;
}

export const ChatRoomCard = (props: ChatRoomCardProps) => {
  const {
    imageUrl = '',
    title = 'Room 1',
    active = 0,
    total = 0,
    owner = {
      name: 'John',
    },
  } = props;
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div className="hover:bg-appHover cursor-pointer p-[2rem] space-x-4 border border-gray-200 shadow-md rounded-2xl drop-shadow-sm max-h-[13rem] flex flex-row overflow-y-clip">
        <img
          src={imageUrl || 'https://via.placeholder.com/150x100'}
          alt="Placeholder"
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="chatroom-body flex flex-col">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-green-500 text-xs">
            Active: {active}/{total}
          </p>
          <p className="text-xs font-bold">Owner: {owner.name}</p>

          <p className="mt-3 description text-[0.9rem] overflow-hidden text-ellipsis whitespace-normal flex-grow max-h-full">
            lorem ipsum dolor sit amet,{' '}
          </p>
        </div>
      </div>
    </>
  );
};
