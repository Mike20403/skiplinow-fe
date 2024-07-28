import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  captionGeneratorValidationSchema,
  topicAndToneGeneratorValidationSchema,
} from '@/validates/caption-inputs.validator.ts';
import { Link } from 'react-router-dom';
import { UNKNOWN } from '@/constants/common.constant.ts';
import { useQueryParams } from '@/hooks/use-query-params.ts';
import { MediaFormPage } from '@/pages/services/start-from-scratch/MediaFormPage.tsx';
import { FacebookIcon } from '@/components/icons/FacebookIcon.tsx';
import { Instagram } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon.tsx';
import { TwitterIcon } from '@/components/icons/TwitterIcon.tsx';

export interface ChooseMediaPageProps {

}

export const ChooseMediaPage = (props:ChooseMediaPageProps) => {
  const query = useQueryParams()
  const name = query.get('name') || UNKNOWN

    return (
      <> {
        name !== UNKNOWN ? (<>
          <MediaFormPage />
          </>)
          :
          <>
            <h1 className="text-4xl font-bold">Generate unique captions from scratch</h1>
            <p className="text-lg">Choose the type of posts you want a caption for and let WhaleAI write it for you.</p>
            <h2 className="text-2xl mt-4">What kind of post do you want ideas for?</h2>
            <form className="grid w-full max-w-sm items-center gap-4" >
              <label htmlFor="Topic" className="text-xl font-semibold mt-10">Topic:</label>
              <Link to={'.?name=facebook'}
                    className="bg-appPrimary hover:bg-appHover flex flex-row space-x-10 items-center cursor-pointer rounded-xl text-white p-10 w-[40rem]">
                <FacebookIcon className="w-[3.5rem] h-[3.5rem]" />
                <div className="flex flex-col gap-2 ">
                  <h1 className="font-bold text-xl text-white">Facebook</h1>
                  <p>Generate posts ideas and captions for a topic.</p>
                </div>
              </Link>
              <Link
                to={'.?name=instagram'}
                className="bg-[#E1306C] hover:bg-[#C13584] flex flex-row space-x-10 cursor-pointer rounded-xl text-white p-10 w-[40rem]"
              >
                <InstagramIcon className="w-[3.5rem] h-[3.5rem]" />
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-xl text-white">Instagram</h1>
                  <p>Generate posts ideas and captions for a topic.</p>
                </div>
              </Link>
              <Link
                to={'.?name=twitter'}
                className="bg-[#1DA1F2] hover:bg-[#0D8DEC] flex flex-row space-x-10 cursor-pointer rounded-xl text-white p-10 w-[40rem]"
              >
                <TwitterIcon className="w-[3.5rem] h-[3.5rem]" />
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-xl text-white">Twitter</h1>
                  <p>Generate posts ideas and captions for a topic.</p>
                </div>
              </Link>
            </form>
          </>
      }

      </>
    )
}