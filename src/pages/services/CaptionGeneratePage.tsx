import { Outlet } from 'react-router-dom';

export interface CaptionGeneratePageProps {}
export const CaptionGeneratePage = (props: CaptionGeneratePageProps) => {
  const {} = props;

  return (
    <>
      <div
        className={
          'caption-generate-page gap-4 flex flex-col justify-start pl-[10rem] md:pl-[20rem] lg:pl-[30rem] pr-[10rem] pt-[6rem]'
        }
      >
        <Outlet />
      </div>
    </>
  );
};
