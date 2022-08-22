import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreMenuBar} from '../../components/Store/StoreMenuBar';
import {StackScreenProps} from '@react-navigation/stack';
import {StoreStackParamList} from '../../nav/StoreNavigator';
import {StoreReviewCard} from '../../components/Store/StoreReviewCard';
import {PhotoModal} from '../../modal/PhotoModal';
import {DesignSystem} from '../../assets/DesignSystem';
import {useInfiniteQuery, useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getStoreData, getStoreReviewList} from '../../api/review';
import {IStoreReview} from '../../data/IStore';
import {NoBobpool} from '../../components/common/NoBobpool';
import {useRecoilValue} from 'recoil';
import {RCstoreId} from '../../state';
import {getStoreId} from '../../api/store';

const RATEHALFWIDTH = (Dimensions.get('screen').width - 27) / 2;
type Props = StackScreenProps<StoreStackParamList, 'StoreReview'>;

const StoreReview = ({navigation, route}: Props) => {
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});
  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };

  const storeId = useQuery(queryKey.STOREID, () => getStoreId());

  const reviewList = useInfiniteQuery(
    [queryKey.STOREREVIEWLIST, storeId.data],
    ({pageParam}) => getStoreReviewList({pageParam}, storeId.data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.result.last === false) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    },
  );

  const reviewInfo = useQuery(queryKey.STORERATING, () => getStoreData(storeId.data)); //평점, 리뷰수는 여기 api에서 얻음..
  // console.log('평점, 리뷰수 용 reviewInfo.data', reviewInfo.data);
  const refreshStoreReview = () => {
    console.log('review refetch');
    reviewList.refetch();
    reviewInfo.refetch();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <Text style={[DesignSystem.h2SB, {color: 'black'}]}>가게 관리</Text>
        </View>
        <StoreMenuBar
          toggleStore={() => navigation.navigate('Store')}
          toggleMission={() => navigation.navigate('StoreMission')}
          toggleReview={() => navigation.navigate('StoreReview')}
          storeStatus={2}
        />
        <View style={[styles.rateWrap]}>
          <View style={[styles.rateBox]}>
            <View style={[styles.rateEach]}>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 6}]}>
                가게 평점
              </Text>
              <Text style={[DesignSystem.subtitle2, DesignSystem.grey17]}>
                <Icon name="star" size={20} color={'#FFDE69'} /> {reviewInfo.data?.averageRate}
              </Text>
            </View>
            <View style={[styles.rateSeperateLine]} />
            <View style={[styles.rateEach]}>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 6}]}>
                리뷰 개수
              </Text>
              <Text style={[DesignSystem.subtitle2, DesignSystem.grey17]}>
                {reviewInfo.data?.reviewCount}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          {reviewList.data?.pages[0].data.result.content.length > 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={reviewList.isLoading} onRefresh={refreshStoreReview} />
              }
              contentContainerStyle={{backgroundColor: '#FFFFFF'}}
              scrollEventThrottle={10}
              data={reviewList.data?.pages}
              renderItem={({item, index}) => {
                return (
                  <>
                    {item.data.result.content.map((review: IStoreReview, i: number) => (
                      <View key={i + index}>
                        <StoreReviewCard
                          name={review.name}
                          date={review.date}
                          rate={review.rate}
                          content={review.content}
                          images={review.images}
                          reply={review.reply}
                          reviewId={review.reviewId}
                          storeId={storeId}
                          openPhotoModal={openPhotoModal}
                        />
                      </View>
                    ))}
                  </>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={{height: 8, backgroundColor: '#F8F8F8'}} />
              )}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{flex: 1}}
              refreshControl={
                <RefreshControl refreshing={reviewList.isLoading} onRefresh={refreshStoreReview} />
              }
            >
              <NoBobpool category={'리뷰'} />
            </ScrollView>
          )}

          <PhotoModal
            imageUri={reviewPhoto}
            visible={photoModal}
            closePhotoModal={() => setPhotoModal(false)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default StoreReview;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  screenHeaderWrap: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  screenStatusWrap: {flexDirection: 'row', flex: 1, backgroundColor: '#FFFFFF'},
  missionUserNumberWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 46,
    width: '100%',
    backgroundColor: '#FCFCFC',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  rateWrap: {
    padding: 12,
  },
  rateBox: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    paddingVertical: 9,
  },
  rateSeperateLine: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: '#EFEFEF',
  },
  rateEach: {
    width: RATEHALFWIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
