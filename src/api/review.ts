import {customAxios} from './customAxios';

//사장님 리뷰 답글 남기기 __ 스웨거에서 report ((reply는 모지 ? ?))
export const postReviewsReply = async (
  data: {
    content: string;
  },
  reviewId: number,
) => {
  const response = await customAxios().post(`/api/v1/reviews/report/${reviewId}`, data);
  return response.data;
};

//가게 정보 조회 (평점, 리뷰갯수 보려고)
export const getStoreData = async (storeId: number) => {
  const response = await customAxios().get(`/api/v1/stores/${storeId}`);
  return response.data.result;
};
//리뷰 목록 조회
export const getStoreReviewList = async ({pageParam = 0}, storeId: number) => {
  const response = await customAxios().get(`/api/v1/reviews/${storeId}`, {
    params: {page: pageParam, size: 5},
  });
  return response;
};
export const postReply = async (
  data: {
    content: string;
  },
  reviewId: number,
) => {
  const response = await customAxios().post(`/api/v1/reviews/reply/${reviewId}`, data);
  return response.data;
};
//사장 리뷰 삭제
export const patchDeleteReview = async (reviewReplyId: number) => {
  const response = await customAxios().patch(`/api/v1/reviews/reply/${reviewReplyId}`);
  console.log(response.data);
  return response.data;
};
