import { PhoneNumberForm } from '@/pages/auth/PhoneNumberForm.tsx';
import { SMS6DigitsForm } from '@/pages/auth/SMS6DigitsForm.tsx';
import { WhaleLogo } from '@/components/logo/WhaleLogo';
import { useState } from 'react';

export interface SMSAuthPageProps {}

export const SMSAuthPage = (props: SMSAuthPageProps) => {
  const [isContinue, setIsContinue] = useState<boolean>(false);

  return (
    <>
      <div className="my-auto m-x-0 flex flex-row bg-white smsauth-form-wrapper rounded-3xl w-[40rem] lg:w-[60rem]">
        <div className="text-xl flex flex-col p-[4rem] gap-4 w-[20rem] sm:w-[30rem] mx-auto justify-start ">
          <div className="translate-y-[-5] form-title flex flex-row justify-center items-center">
            <h1 className="text-[2.5rem] sm:text-[4rem] text-appPrimary sm:translate-x-5 text-5xl font-bold ">
              Whale.AI
            </h1>
            <WhaleLogo className="hidden sm:block min-w-[10rem] translate-x-5 fill-appPrimary" />
          </div>
          {isContinue ? (
            <SMS6DigitsForm setToggleForm={setIsContinue} />
          ) : (
            <PhoneNumberForm setToggleForm={setIsContinue} />
          )}
        </div>
        <div className="hidden lg:flex md:w-[25rem] bg-appPrimary rounded-e-3xl">
          <div className="m-auto -translate-y-[3rem] p-[3rem]">
            <h2 className="text-white font-bold  text-3xl">Welcome to WhaleAI</h2>
            <h3 className="mt-[3rem] font-thin text-white italic text-[1rem]">
              An AI-powered captions generators for your media
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
