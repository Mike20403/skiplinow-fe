import { VerifyOTPResponse } from '@/models/auth.model';
import { AxiosResponse } from 'axios';
import { axiosClient } from 'utilities/axios';

export async function fetchOTPCode(phoneNumber?: string) {
  return axiosClient.post(`users/generate`, { phoneNumber }).then((res: AxiosResponse<VerifyOTPResponse>) => res.data);
}

export const verifyOTPCode = (userId?: string, phoneNumber?: string, accessCode?: string) => {
  return axiosClient
    .post(`users/check`, { userId, phoneNumber, accessCode })
    .then((res: AxiosResponse<void>) => res.data);
};
