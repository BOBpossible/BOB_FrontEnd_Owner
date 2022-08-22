import {customAxios} from './customAxios';

// //마이페이지 - 유저 정보
// export const getUserInfo = async () => {
//   const {data} = await customAxios().get('/api/v1/users/me');
//   return data.result;
// };

//알림
export const getNotifications = async () => {
  const response = await customAxios().get('/api/v1/push-notifications/me');
  return response.data.result;
};
//알림 확인
export const patchNotificationsStatus = async (notiId: number) => {
  const response = await customAxios().patch(`/api/v1/push-notifications/me/${notiId}`);
  return response.data.message;
};

export const patchNotificationsReadAll = async () => {
  const response = await customAxios().patch('/api/v1/push-notifications/me/all');
  return response.data.message;
};

//마이페이지 - 알림 설정 조회
export const getNotiSettting = async () => {
  const response = await customAxios().get('/api/v1/owners/me/notification');
  console.log('알림설정조회axios', response.data.result);
  return response.data.result;
};
//마이페이지 - 알림 설정 수정
export const patchNotiSetting = async (data: {
  event: boolean;
  mission: boolean;
  question: boolean;
  review: boolean;
}) => {
  // console.log('patch에 넘어온data', data);
  const response = await customAxios().patch('/api/v1/owners/me/notification', data);
  return response.data;
};

//문의하기
export const postQuestions = async (data: {content: string; title: string}) => {
  const response = await customAxios().post('/api/v1/questions', data);
  return response.data;
};
//문의 내역 조회
export const getQuestions = async () => {
  const response = await customAxios().get('/api/v1/questions/me');
  return response.data.result;
};

export const getQuestionDetail = async (questionId: number) => {
  const response = await customAxios().get(`/api/v1/questions/${questionId}`);
  return response.data.result;
};

//회원탈퇴
export const patchQuit = async () => {
  console.log('탈퇴요청');
  const response = await customAxios().patch('/api/v1/owners/me/quit');
  console.log('탈퇴토티퉤퇴텥티퉤퉤토티퉤', response.data);
  return response.data;
};
