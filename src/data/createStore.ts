import {RegisterStoreInterface} from './RegisterStoreInterface';

export const createStore = (): RegisterStoreInterface => {
  return {
    addressDong: '',
    addressStreet: '',
    operationTimeVO: [
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'MONDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'TUESDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'WEDNESDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'THURSDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'FRIDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'SATURDAY',
        isOpen: true,
      },
      {
        breakEndTime: '00:00:00',
        breakStartTime: '00:00:00',
        endTime: '00:00:00',
        startTime: '00:00:00',
        dayofweek: 'SUNDAY',
        isOpen: true,
      },
    ],
    representativeMenuName: '',
    storeName: '',
    storeTypeId: 0,
    tableNum: 0,
    x: 0,
    y: 0,
  };
};