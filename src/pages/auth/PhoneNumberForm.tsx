import { Button } from '@/components/ui/button.tsx';
import { phoneValidationSchema } from '@/validates/sms-auth.validator.ts';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PhoneInput } from '../../components/inputs/PhoneInput.tsx';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import useOTPStore from '@/stores/use-auth.store.ts';
import { useToast } from '../../components/ui/use-toast.ts';
import { SMSRequestData } from '@/models/auth.model.ts';
import { fetchOTPCode } from '@/apis/auth/auth.api.ts';

export interface PhoneNumberFormProps {
  setToggleForm: (value: boolean) => void;
}

export const PhoneNumberForm = (props: PhoneNumberFormProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(phoneValidationSchema),
  });
  const { setCredentials, credentials } = useOTPStore();
  const { setToggleForm } = props;
  const [onVerificationSend, setOnVerificationSend] = useState(false);
  const { toast } = useToast();

  const handleSMSSubmit = async (data: SMSRequestData) => {
    trigger('phoneNumber');
    setOnVerificationSend(true);
    //TODO call api to send verification code
    try {
      const res = await fetchOTPCode(data.phoneNumber);

      toast({
        title: 'Success',
        variant: 'success',
        description: 'Code sent successfully',
      });

      if (res && res.message && res.result) {
        toast({
          title: 'Success',
          variant: 'success',
          description: res.message,
        });

        setCredentials({ ...credentials, userId: res.result.id });
        setToggleForm(true);
      } else {
        throw new Error('Failed to send verification code');
      }
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: (error as any).message,
      });
    }
    setCredentials({ phoneNumber: data.phoneNumber });
    setOnVerificationSend(false);
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      // trigger blur event to validate
      e.target.blur();
      await handleSubmit(handleSMSSubmit)();
    }
  };

  return (
    <>
      <form className="flex flex-col gap-[2rem] sm:gap-[5rem] smsauth-form" onSubmit={handleSubmit(handleSMSSubmit)}>
        <div className="flex flex-col gap-4">
          <PhoneInput
            international={true}
            {...(register('phoneNumber', { required: true }) as any)}
            numberInputProps={{
              onKeyDown: handleKeyDown,
              className: `${errors.phoneNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
text-[0.8rem] h-[2rem] sm:h-[3rem] sm:text-[1rem]
`,
            }}
            placeholder="Enter your phone number"
            className="mt-2 border-appPrimary"
          />{' '}
          <p className="hidden sm:inline-flex mx-0 font-[400] text-gray-600 text-sm w-100">
            Type in your phone number to receive a verification code that then is used to login to WhaleAI
          </p>
          <p className="text-xs text-red-500">{errors.phoneNumber?.message}</p>
        </div>
        <div className="flex form-action w-full">
          <Button
            type="submit"
            disabled={onVerificationSend}
            className={`gap-4 text-[0.7rem] sm:text-[1rem] p-1 sm:p-[1.5rem] bg-appPrimary hover:bg-appSecondary font-bold mx-auto min-w-[10rem]`}
          >
            <ArrowPathIcon className={`${!onVerificationSend ? 'hidden' : 'animate-spin'} w-6 h-6`} />
            Continue
          </Button>{' '}
        </div>
      </form>
    </>
  );
};
