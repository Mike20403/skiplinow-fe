import { axiosClient } from 'utilities/axios';

export async function fetchOTPCode(phoneNumber?: string) {
  return axiosClient
    .post(`users/generate`, { phoneNumber })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export const verifyOTPCode = (phoneNumber?: string, accessCode?: string) => {
  return axiosClient
    .post(`users/check`, { phoneNumber, accessCode })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
