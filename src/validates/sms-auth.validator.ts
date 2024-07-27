import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const phoneValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .transform((value) => value.replace(/\s+/g, ''))
    .test('is-valid-phone-number', 'Phone number must be a valid international phone number', (value) => {
      console.log('validation: ', value);
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber ? phoneNumber.isValid() : false;
    })
    .required('Phone number is required'),
});

export const sms6digitsValidationSchema = Yup.object({
  smsCode: Yup.string()
    .matches(/^\d{6}$/, 'SMS code must be 6 digits')
    .required('SMS code is required'),
});
