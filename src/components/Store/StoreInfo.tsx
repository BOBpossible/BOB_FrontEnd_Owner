import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {ImageInterface, RegisterStoreInterface} from '../../data';
import {RenderImageList} from '../common/RenderImageList';
import {StoreTime} from './StoreTime';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ImageSwiper} from '../common/ImageSwiper';
import {DesignSystem} from '../../assets/DesignSystem';
import {queryKey} from '../../api/queryKey';
import {getMenuImage, getStoreImage, getStoreInfo} from '../../api/store';
import {useQuery} from 'react-query';
import {editOperationTime, storeData} from '../../state';

//prettier-ignore
const STORETYPE = ['', '한식당', '일식당', '중식당', '양식당', '치킨집', '분식집', '고기/구이', '도시락', '야식(족발,보쌈)', '패스트푸드', '디저트/카페', '아시안푸드'];

export const StoreInfo = () => {
  const store = useRecoilValue(storeData); //쿼리?
  const storeTime = useRecoilValue(editOperationTime);
  const storeImages = useQuery(queryKey.STOREIMAGES, getStoreImage);
  const menuImages = useQuery(queryKey.MENUIMAGES, getMenuImage);

  console.log(storeImages.data);

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      {storeImages.isLoading ? (
        <ImageSwiper height={220} imageList={[]} />
      ) : (
        <ImageSwiper height={220} imageList={storeImages.data} />
      )}

      <View style={[styles.storeInfoWrap]}>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>상호명</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.storeName}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>가게 한줄 소개</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.intro}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게 주소</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.addressStreet}</Text>
          </View>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>{store.addressDetail}</Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게 유형</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
              {STORETYPE[store.storeTypeId]}
            </Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>테이블 수</Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
              {store.tableNum === 0 ? '0~2개' : '3개 이상'}
            </Text>
          </View>
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>대표메뉴</Text>
          <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}>
            대표메뉴 미션을 위해 사용됩니다.
          </Text>
          <View style={[styles.fieldBox]}>
            <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
              {store.representativeMenuName}
            </Text>
          </View>
        </View>

        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}>
            대표메뉴 사진
          </Text>
          <View>
            {menuImages.isLoading ? (
              <RenderImageList imageData={[]} imageSize={100} />
            ) : (
              <RenderImageList imageData={menuImages.data} imageSize={100} />
            )}
          </View>
          {/* 가게관리에서 메뉴 이미지수정되면 살리기 */}
        </View>
        <View style={[styles.infoFieldWrap]}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>운영시간</Text>
          <StoreTime operationData={storeTime} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storeInfoWrap: {flex: 1, marginLeft: 16, marginRight: 16, marginTop: 24, marginBottom: 24},
  infoFieldWrap: {marginBottom: 28, width: '100%'},
  fieldSubTitle: {fontSize: 14, lineHeight: 22, fontFamily: 'Pretendard-Regular', color: '#777777'},
  fieldBox: {
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
  },
});
