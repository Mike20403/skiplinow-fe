import { axiosClient } from 'utilities/axios';

export async function fetchOTPCode(phoneNumber: string) {
  return axiosClient
    .post(`users/generate`,
      { phoneNumber },
    )
    .then((res) => res.data);
}
