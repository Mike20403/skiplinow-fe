import { MouseEventHandler, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { handler } from 'tailwindcss-animate';


export interface SideBarItemProps {
  icon: ReactNode,
  title: string;
  active: boolean;
  onClick: () => void;
  id:string;
}
export const SideBarItem = ({ id, icon, title, active, onClick }: SideBarItemProps) => {
  return (<>
    <div onClick={onClick}
         className={`flex flex-row hover:bg-appHoverGray items-center justify-start p-2 cursor-pointer ${active ? 'bg-appPrimary text-white' : ''}`}>
      <div className="flex flex-row items-center justify-center w-10 h-10 rounded-md">
        {icon}
      </div>
      <h1 className="ml-4 text-sm font-semibold ">{title}</h1>
    </div>
    <hr/>
  </>)
}