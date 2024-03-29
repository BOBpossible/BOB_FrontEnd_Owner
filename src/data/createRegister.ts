import {RegisterInterface} from './IRegister';

export const createRegister = (): RegisterInterface => {
  return {
    overAge14: false,
    termsOfService: false,
    privacyPolicy: false,
    locationInfo: false,
    marketing: false,
    name: '',
    gender: '',
    birthDate: '',
    phone: '',
  };
};
