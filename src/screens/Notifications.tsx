import React from 'react';
import {View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MissionStackParamList} from '../nav/MissionNavigator';
import {MyHeader} from '../components/My/MyHeader';
import {NotificationCard} from '../components/NotificationCard';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {queryKey} from '../api/queryKey';
import {getNotifications, patchNotificationsReadAll} from '../api/my';
import {INotiType} from '../data/IMissions';
import {NoBobpool} from '../components/common/NoBobpool';
import {useRecoilValue} from 'recoil';
import {RCstoreId} from '../state';
import {DesignSystem} from '../assets/DesignSystem';

type Props = NativeStackScreenProps<MissionStackParamList, 'Notifications'>;

export const Notifications = ({navigation, route}: Props) => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(RCstoreId);
  const DataNoti = useQuery<INotiType[]>(queryKey.NOTIFICATIONS, getNotifications, {
    onError: (err) => {
      console.log('ERR', err);
    },
  });
  // console.log('DataNoti', DataNoti); //스웨거에서result인 배열
  const goBack = () => {
    navigation.goBack();
  };

  const readAllMutation = useMutation(() => patchNotificationsReadAll(), {
    onSuccess: (data) => {
      console.log('알림확인 모두 전환 성공: ', data);
      queryClient.invalidateQueries('notifications');
    },
    onError: (err) => {
      console.log('알림확인 모두 전환 실패: ', err);
    },
  });

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'알림'} />

        {DataNoti.data?.length !== 0 ? (
          <FlatList
            style={{marginLeft: 16, marginRight: 16}}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      readAllMutation.mutate();
                    }}
                  >
                    <Text style={[DesignSystem.grey8, DesignSystem.body2Lt]}>모두 읽음</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60, marginTop: 12}}
            scrollEventThrottle={10}
            data={DataNoti.data}
            // data={dummy}
            renderItem={({item}) => (
              <NotificationCard
                checked={item.checked}
                date={item.date}
                id={item.id}
                name={item.name}
                pushType={item.pushType}
                subId={item.subId}
                subTitle={item.subTitle}
                title={item.title}
                navigation={navigation}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 8}} />}
          />
        ) : (
          <NoBobpool category={'알림'} />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  flexTop: {},
});
