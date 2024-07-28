import { PhoneNumberForm } from '@/pages/auth/PhoneNumberForm.tsx';
import { SMS6DigitsForm } from '@/pages/auth/SMS6DigitsForm.tsx';
import { WhaleLogo } from '@/components/logo/WhaleLogo';
import { useState } from 'react';

export interface SMSAuthPageProps { }

export const SMSAuthPage = (props: SMSAuthPageProps) => {
  const [isContinue, setIsContinue] = useState<boolean>(false);

  return (
    <>
      <div className="bg-white p-[4rem] smsauth-form-wrapper rounded-3xl w-[60rem]">
        <div className="flex flex-col gap-4 max-w-[30rem] mx-auto justify-start ">
          <div className=" translate-y-[-5] form-title flex flex-row justify-center items-center">
            <h1 className="text-[4rem] text-appPrimary translate-x-5 text-5xl mb-5 font-bold ">Whale.AI</h1>
            <WhaleLogo className="translate-x-5 fill-appPrimary" />
          </div>
          {isContinue ? (
            <SMS6DigitsForm setToggleForm={setIsContinue} />
          ) : (
            <PhoneNumberForm setToggleForm={setIsContinue} />
          )}
        </div>
      </div>
    </>
  );
};
