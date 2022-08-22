import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {patchDeleteReview, postReply} from '../../api/review';
import {useMutation, useQueryClient} from 'react-query';
import {queryKey} from '../../api/queryKey';

type StoreReviewCardProps = {
  images: {imageUrl: string}[];
  name: string;
  date: string;
  rate: number;
  content: string;
  reviewId: number;
  reply: {date: string; reply: string; reviewReplyId: number}[];
  storeId: number;
  openPhotoModal: (imageSource: string) => void;
};

export const StoreReviewCard: FC<StoreReviewCardProps> = ({
  images,
  name,
  date,
  rate,
  content,
  reply,
  reviewId,
  storeId,
  openPhotoModal,
}) => {
  const [openReply, setOpenReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const renderedImage = (imagedata: {imageUrl: string}[]) => {
    return (
      <View style={[styles.reviewRow3]}>
        {imagedata.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => openPhotoModal(item.imageUrl)}>
              <View style={[styles.reviewImageWrap]}>
                <FastImage source={{uri: item.imageUrl}} style={[styles.imageSize]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  ///
  const queryClient = useQueryClient();

  const reviewMutation = useMutation((data: {content: string}) => postReply(data, reviewId), {
    onSuccess(Reviewdata) {
      console.log(Reviewdata);
      queryClient.invalidateQueries(queryKey.STOREREVIEWLIST);
    },
  });
  const submitReply = async () => {
    await reviewMutation.mutate({
      content: replyContent,
    });
  };

  const reviewDeleteMutation = useMutation(() => patchDeleteReview(reply[0].reviewReplyId), {
    onSuccess: (data) => {
      console.log('리뷰삭제 성공: ', data);
      queryClient.invalidateQueries(queryKey.STOREREVIEWLIST);
    },
    onError: (e) => {
      console.log('ere', e);
    },
  });
  const handleSubmitReplyDelete = async () => {
    await reviewDeleteMutation.mutate();
  };
  ///
  return (
    <View style={[styles.reviewWrap]}>
      <View style={[styles.reviewRow1]}>
        <Text style={[DesignSystem.title4Md, {color: '#000000', marginRight: 12}]}>{name}</Text>
        <Text style={[DesignSystem.body1Lt, {color: '#C8C8C8'}]}>
          {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)}
        </Text>
      </View>
      <View style={[styles.reviewRow2]}>
        {[...Array(rate)].map((e, i) => (
          <Icon name="star" size={18} color={'#FFDE69'} key={i} />
        ))}
      </View>
      <View style={[styles.reviewRow3]}>
        <Text style={[DesignSystem.body1Long, {color: 'black'}]}>{content}</Text>
      </View>
      {renderedImage(images)}
      {/* 사장답글 있는지 여부에따라 */}
      {reply.length !== 0 ? (
        <View style={[styles.ownerWrap]}>
          <View
            style={[styles.ownerTitle, {alignItems: 'center', justifyContent: 'space-between'}]}
          >
            <View style={{flexDirection: 'row'}}>
              <Text style={[DesignSystem.body2Lt, {color: '#616161'}]}>사장님 답글</Text>
              <Text style={[DesignSystem.body2Lt, {color: '#B7B7B7', marginLeft: 8}]}>
                {reply[0].date.slice(0, 4)}.{reply[0].date.slice(5, 7)}.{reply[0].date.slice(8, 10)}
              </Text>
            </View>
            <TouchableOpacity onPress={handleSubmitReplyDelete}>
              <Text style={[DesignSystem.body2Lt, DesignSystem.grey7]}>삭제</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.ownerContents]}>
            <Text style={[DesignSystem.body2Long, {color: 'black'}, styles.ownerContentsText]}>
              {reply[0].reply}
            </Text>
          </View>
        </View>
      ) : (
        <>
          {openReply && (
            <TextInput
              style={[styles.replyContent]}
              multiline={true}
              placeholder={'답글 작성'}
              placeholderTextColor="#949494"
              selectionColor={'#6C69FF'}
              onChangeText={(text: string) => {
                setReplyContent(text);
              }}
              value={replyContent}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              if (openReply) {
                if (replyContent !== '') {
                  //post 올리기
                  submitReply();
                  setReplyContent('');
                }
                setOpenReply(false);
              } else {
                setOpenReply(true);
              }
            }}
            style={replyContent !== '' ? styles.replySubmitBtn : styles.replyBtn}
          >
            <Text
              style={[
                DesignSystem.title4Md,
                replyContent !== '' ? {color: '#6C69FF'} : {color: '#949494'},
              ]}
            >
              {openReply ? '작성 완료' : '답글 달기'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewWrap: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 12,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 0.5,
  },
  reviewRow1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRow2: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  reviewRow3: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  reviewImageWrap: {marginRight: 8},
  reviewText: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  reviewRate: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    marginLeft: 4,
  },
  imageSize: {
    height: 80,
    width: 80,
  },
  ownerWrap: {
    flexDirection: 'column',
  },
  ownerTitle: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ownerContents: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  ownerContentsText: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  replyContent: {
    width: '100%',
    height: 90,
    flexWrap: 'wrap',
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    borderRadius: 10,
    marginTop: 8,
  },
  replyBtn: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  replySubmitBtn: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#6C69FF',
    borderWidth: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
