// authStore.ts
import create from 'zustand';
import { fetchOTPCode, verifyOTPCode } from '@/apis/auth/auth.api';
import { persist } from 'zustand/middleware';

export interface Credentials {
  phoneNumber?: string;
  accessCode?: string | null;
  expiresAt?: number | null;
}

interface OTPStoreState {
  credentials: Credentials;
  isOTPSent: boolean;
  isSendingOTP: boolean;
  setCredentials: (payload: Credentials) => void;
  setIsOTPSent: (status: boolean) => void;
  setOnOTPSending: (status: boolean) => void;
  verifyOTP: (phoneNumber: string, code: string) => Promise<boolean>; // Adjust the type as needed
  fetchOTPCode: (phoneNumber: string) => Promise<any>; // Adjust the type as needed
  resetOTP: () => void;
  logout: () => void; // function to reset the store
  initializeStore: () => void; // function to initialize the store from localStorage
}

const useOTPStore = create(
  persist<OTPStoreState>(
    (set, get) => ({
      credentials: {
        phoneNumber: '',
        accessCode: null,
        expiresAt: null,
      },
      isOTPSent: false,
      isSendingOTP: false,
      logout: () => {
        set({ credentials: { phoneNumber: '', accessCode: null, expiresAt: null } });
        localStorage.removeItem('otp-store');
      },
      setCredentials: (payload: Credentials) => {
        const newCredentials = {
          ...get().credentials,
          ...payload,
        };
        set({ credentials: newCredentials });

        if (payload.expiresAt) {
          const timeoutDuration = payload.expiresAt - Date.now();
          if (timeoutDuration > 0) {
            setTimeout(() => {
              set({ credentials: { ...newCredentials, accessCode: null } });
              localStorage.removeItem('otp-store');
            }, timeoutDuration);
          }
        }
      },
      setIsOTPSent: (status: boolean) => set({ isOTPSent: status }),
      setOnOTPSending: (status: boolean) => set({ isSendingOTP: status }),
      verifyOTP: verifyOTPCode,
      fetchOTPCode: fetchOTPCode,
      resetOTP: () => set({ isOTPSent: false }),
      initializeStore: () => {
        const otpStore = localStorage.getItem('otp-store');
        const { state } = JSON.parse(otpStore || '{}');
        const savedCredentials = state?.credentials

        if (savedCredentials) {
          set({ credentials: savedCredentials });


          if (savedCredentials.expiresAt && savedCredentials.expiresAt < Date.now()) {
            set({ credentials: { ...savedCredentials, accessCode: null } });
            localStorage.removeItem('otp-store');
          } else if (savedCredentials.expiresAt && savedCredentials.expiresAt > Date.now()) {
            const timeoutDuration = savedCredentials.expiresAt - Date.now();
            if (timeoutDuration > 0) {
              setTimeout(() => {
                set({ credentials: { ...savedCredentials, accessCode: null } });
                localStorage.removeItem('otp-store');
              }, timeoutDuration);
            }
          }
        }
      },
    }),
    {
      name: 'otp-store',
    },
  ),
);

export default useOTPStore;
