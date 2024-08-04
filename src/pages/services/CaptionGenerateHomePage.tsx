import { Link } from 'react-router-dom';

export interface CaptionGenerateHomePageProps {}
export const CaptionGenerateHomePage = (props: CaptionGenerateHomePageProps) => {
  const {} = props;

  return (
    <>
      <div className="start-from-scratch flex flex-col gap-10 min-w-[25rem]">
        <h1 className="font-bold text-4xl">Generate post ideas and captions in seconds</h1>
        <div className="flex flex-col gap-5">
          <Link to={'medias'} className="bg-appPrimary hover:bg-appHover cursor-pointer rounded-xl text-white p-10">
            <h1 className="font-bold text-xl text-white">Start from Scratch</h1>
            <p>Generate new captions to engage, delight, or sell...</p>
          </Link>
          <Link
            to={'get-inspired'}
            className="bg-appPrimary hover:bg-appHover cursor-pointer rounded-xl text-white p-10"
          >
            <h1 className="font-bold text-xl text-white">Get inspired</h1>
            <p>Generate posts ideas and captions for a topic.</p>
          </Link>
        </div>
      </div>
    </>
  );
};
