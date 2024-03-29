export type IMissionDtoType = {
  mission: string;
  missionId: number;
  phone: string;
  point: number;
  startDate: string;
  userId: number;
  userName: string;
};
//미션탭 진행중
export type IMissionProgressType = {
  missionOnProgressCount: number;
  ownerMissionDto: IMissionDtoType[];
};
//미션탭 성공요청
export type IMissionSuccessType = {
  date: string;
  dayOfWeek: string;
  mission: string;
  missionId: number;
  point: string;
  userName: string;
  phone: number;
  seperate?: any;
};
export type dayofweekType = {
  [index: string]: string;
  MONDAY: string;
  TUESDAY: string;
  WEDNESDAY: string;
  THURSDAY: string;
  FRIDAY: string;
  SATURDAY: string;
  SUNDAY: string;
};
//알림
export type INotiType = {
  checked: boolean;
  date: string;
  id: number;
  name: string;
  pushType: string;
  subId: number;
  subTitle: string;
  title: string;
};
