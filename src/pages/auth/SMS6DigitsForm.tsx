import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp.tsx';
import { useEffect, useState } from 'react';
import { sms6digitsValidationSchema } from '@/validates/sms-auth.validator.ts';
import useOTPStore from '@/stores/use-auth.store.ts';
import { verifyOTPCode } from '@/apis/auth/auth.api.ts';
import { useToast } from '../../components/ui/use-toast.ts';
import { maskPhoneNumber } from '@/utils/string.utils.ts';
import { useNavigate } from 'react-router-dom';

export interface SMS6DigitsFormProps {
  setToggleForm: (value: boolean) => void;
}

export const SMS6DigitsForm = (props: SMS6DigitsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(sms6digitsValidationSchema),
  });
  const { setToggleForm } = props;
  const [count, setCount] = useState<number>(10);
  const [isCountDown, setIsCountDown] = useState<boolean>(false);
  const { setIsOTPSent, setCredentials, credentials } = useOTPStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  let intervalId: NodeJS.Timeout | null = null;
  const handleSMSVerify = async (data: any) => {
    //TODO call api to send verification code
    try {
      const res = await verifyOTPCode(credentials?.phoneNumber, data.smsCode);

      if (res && res.result) {
        setCredentials({ ...credentials, accessCode: res.result.accessCode, expiresAt: res.result.expiresAt });
        toast({
          title: 'Success',
          variant: 'success',
          description: res.message,
        });
        navigate('/');
      }
    } catch (error: unknown) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.response.data.message,
      });
    }
  };

  const handleResendCode = (e: any) => {
    setIsCountDown(true);
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId!);
          setIsCountDown(false);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
  return (
    <>
      <p className="text-[text-gray-400]">A 6-digits code was sent to {maskPhoneNumber(credentials.phoneNumber)}</p>
      <form className="flex flex-col gap-[4rem] max-w-[30rem] smsauth-form" onSubmit={handleSubmit(handleSMSVerify)}>
        <div className="flex gap-4 flex-col">
          <p className="font-bold">One-Time password:</p>
          <div className="flex flex-row items-center gap-4">
            <InputOTP {...register('smsCode')} maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot className="w-[4rem] h-[3rem]" index={0} />
                <InputOTPSlot className="w-[4rem] h-[3rem]" index={1} />
                <InputOTPSlot className="w-[4rem] h-[3rem]" index={2} />
                <InputOTPSlot className="w-[4rem] h-[3rem]" index={3} />
                <InputOTPSlot className="w-[4rem] h-[3rem]" index={4} />
                <InputOTPSlot className="w-[4rem] h-[3rem]" index={5} />{' '}
              </InputOTPGroup>
            </InputOTP>
            <a onClick={handleResendCode} hidden={isCountDown} className="cursor-pointer text-appPrimary text-sm">
              Resend code
            </a>
            <p hidden={!isCountDown} className="text-sm">
              {count}
            </p>
          </div>
          <p className="text-xs text-gray-400">Please enter your one-time password sent to your phone.</p>
          <p className="text-red-500">{errors.smsCode?.message}</p>
        </div>
        <div className="flex form-action w-full">
          <Button
            type="button"
            onClick={() => {
              setToggleForm(false);
            }}
            className={'text-[1rem] p-[1.5rem] bg-appSecondary font-bold hover:bg-appTertiary mx-auto min-w-[10rem]'}
          >
            Back
          </Button>{' '}
          <Button
            type="submit"
            className={'text-[1rem] p-[1.5rem] bg-appPrimary font-bold hover:bg-appSecondary mx-auto min-w-[10rem]'}
          >
            Verify phone number
          </Button>{' '}
        </div>
      </form>
    </>
  );
};
