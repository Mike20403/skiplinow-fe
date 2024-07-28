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
  initializeStore: () => void; // function to initialize the store from localStorage
}

const useOTPStore = create(persist<OTPStoreState>((set, get) => ({
  credentials: {
    phoneNumber: '',
    accessCode: null,
    expiresAt: null,
  },
  isOTPSent: false,
  isSendingOTP: false,

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
          //get().logout();
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
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const { credentials } = JSON.parse(savedCredentials);

      set({ credentials: JSON.parse(savedCredentials) });
      if (credentials.expiresAt && credentials.expiresAt < Date.now()) {
        set({ credentials: { ...credentials, accessCode: null } });
        localStorage.removeItem('credentials');
      } else if (credentials.expiresAt) {
        const timeoutDuration = credentials.expiresAt - Date.now();
        if (timeoutDuration > 0) {
          setTimeout(() => {
            set({ credentials: { ...credentials, accessCode: null } });
            localStorage.removeItem('credentials');
          }, timeoutDuration);
        }
      }
    }
  },
}), {
  name: 'otp-store'
}));

export default useOTPStore;
