import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { SideBarLogo } from '../logo/SideBarLogo.tsx';
import { Button } from '../ui/button.tsx';
import { useCallback, useEffect, useState } from 'react';
import { SideBarItem } from '@/components/navigation-bar/SideBarItem.tsx';
import { ArrowLeftEndOnRectangleIcon, CubeTransparentIcon, UserIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';
import useOTPStore from '@/stores/use-auth.store.ts';

export interface SideBarProps {
  open?: boolean;
  className?: string;
}

export const SideBar = (props: SideBarProps) => {
  const { open: initialState = true, className } = props;
  const [open, setOpen] = useState(initialState);
  const [active, setActive] = useState('services');
  const { setCredentials } = useOTPStore();
  const navigate = useNavigate();

  const items = [
    { id: 'services', icon: <CubeTransparentIcon />, title: 'Service', outlet: 'services' },
    { id: 'profile', icon: <UserIcon />, title: 'Profile', outlet: 'profile' },
  ];

  const handleItemClick = useCallback((id: string) => {
    setActive(id);
    navigate(id);
  }, []);

  const handleLogout = useCallback(() => {
    console.log('test');
    setCredentials({
      phoneNumber: '',
      accessCode: null,
      expiresAt: null,
    });
    localStorage.clear();
    navigate('/signup');
  }, []);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        {...props}
        className={`bg-appGray absolute h-full transition-transform duration-3000 ease-in-out 
        ${open ? 'translate-x-0 w-[25%]' : '-translate-x-[calc(100%-3.5rem)] md:-translate-x-[calc(100%-3.5rem)]'} min-w-[7rem] md:min-w-[17rem] w-[25%] flex flex-col h-[100vh] bg-white shadow-lg
        ${className}`}
      >
        <a
          href="/"
          className={`min-w-[4rem] sticky top-0 left-0 logo-section flex flex-row justify-center items-center`}
        >
          <h1
            className={` ${!open ? 'hidden' : 'hidden md:block'} translate-x-1 text-appPrimary text-xl md:text-3xl font-bold`}
          >
            Whale.AI
          </h1>
          <SideBarLogo className={` ${!open ? 'hidden' : ''} translate-y-1 fill-appPrimary`} />
        </a>
        <hr />
        <div className="flex flex-row h-full items-center justify-between">
          <div className="flex flex-col item-wrapper flex-1 h-full justify-between">
            <div className="item-group">
              {items.map((item, index) => (
                <SideBarItem
                  onClick={() => handleItemClick(item.id)}
                  active={active === item.id}
                  key={index}
                  {...item}
                />
              ))}
            </div>
            <div className="item-group">
              <SideBarItem
                onClick={() => handleLogout()}
                active={active === 'logout'}
                icon={<ArrowLeftEndOnRectangleIcon />}
                title="Logout"
                id="logout"
              />
            </div>
          </div>
          <Button
            onClick={toggleSidebar}
            className="text-black flex-4 bg-transparent rounded-none h-full hover:bg-none hover:bg-sky-100"
          >
            {!open ? <ArrowRightIcon className="cursor-pointer" /> : <ArrowLeftIcon className="cursor-pointer" />}
          </Button>
        </div>
      </div>
    </>
  );
};
