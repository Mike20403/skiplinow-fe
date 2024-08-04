import { SideBar } from '@/components/navigation-bar/SideBar.tsx';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>
      <div className="w-[100vw] max-w-[100vw] max-h-[100vh]">
        <SideBar className="sidebar-section !fixed top-0 left-0 w-[25%]" />
        <div className="content-section min-h-[100vh] h-full bg-white">
          <Outlet />
        </div>
      </div>
    </>
  );
};
