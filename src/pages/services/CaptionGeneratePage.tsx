import { Outlet } from 'react-router-dom';


export interface CaptionGeneratePageProps {

}
export const CaptionGeneratePage = (props:CaptionGeneratePageProps) => {
  const {} = props;


  return (
    <>
      <div className={"caption-generate-page gap-4 flex flex-col justify-start pl-[30rem] pt-[6rem]"}>
        <Outlet />
      </div>
    </>
  )
}