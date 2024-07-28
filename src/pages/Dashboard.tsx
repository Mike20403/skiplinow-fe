import { SideBar } from '@/components/navigation-bar/SideBar.tsx';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>

      <div className="relative bg-white w-[100vw] h-full min-h-[100vh]">
        <SideBar className="absolute sidebar-section !fixed top-0 left-0 w-[25%] h-[100%]" />
        <div className="content-section h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};
