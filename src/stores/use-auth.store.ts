import { fetchOTPCode } from '@/apis/auth/auth.api';
import create from 'zustand';

const useOTPStore = create((set) => ({
  otp: '',
  isOTPSent: false,
  isSendingOTP: false,
  setOTP: (otp: string) => set({ otp }),
  setIsOTPSent: (status: boolean) => set({ isOTPSent: status }),
  setOnOTPSending: (status: boolean) => set({ isSendingOTP: status }),
  fetchOTPCode: fetchOTPCode,
  resetOTP: () => set({ otp: '', isOTPSent: false }),
}));

export default useOTPStore;
