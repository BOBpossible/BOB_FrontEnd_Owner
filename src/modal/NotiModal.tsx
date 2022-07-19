import React, {FC} from 'react';
//prettier-ignore
import {View, StyleSheet, Text, FlatList, TouchableOpacity, SafeAreaView, Modal, Image} from 'react-native';
import {MyHeader} from '../components/My/MyHeader';
import {NotificationCard} from '../components/NotificationCard';
// import {getNotifications, patchNotificationsStatus} from '../api';
import {useMutation, useQuery, useQueryClient} from 'react-query';
// import {INotiType} from '../data';
import {queryKey} from '../api/queryKey';
import {INotiType} from '../data/IMissions';
import {getNotifications, patchNotificationsStatus} from '../data/INoti';
import {DesignSystem} from '../assets/DesignSystem';

type NotiModalProps = {
  visible: boolean;
  closeNotiModal: () => void;
  goRequest: () => void;
};

export const NotiModal: FC<NotiModalProps> = ({visible, closeNotiModal, goRequest}) => {
  const queryClient = useQueryClient();

  const DataNoti = useQuery<INotiType[]>(queryKey.NOTIFICATIONS, getNotifications, {
    onError: (err) => {
      console.log('ERR', err);
    },
    onSuccess: (data) => {
      console.log('DataNoti', data);
    },
  });
  const missionSuccessRequestMutation = useMutation(
    (notiId: number) => patchNotificationsStatus(notiId),
    {
      onSuccess: (data) => {
        console.log('알림확인 전환 성공: ', data);
        queryClient.invalidateQueries('notifications');
      },
      onError: (err) => {
        console.log('알림확인 전환 실패: ', err);
      },
    },
  );
  const checkedNoti = (notiId: number) => {
    missionSuccessRequestMutation.mutate(notiId);
  };
  // console.log('DATANOTI', DataNoti.data?.length === 0); //스웨거에서result인 배열
  return (
    <Modal visible={visible}>
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={closeNotiModal} title={'알림'} />
        {DataNoti.data?.length !== 0 ? (
          <FlatList
            style={{marginLeft: 16, marginRight: 16}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60, marginTop: 12}}
            scrollEventThrottle={10}
            data={DataNoti.data}
            renderItem={({item}) => (
              <NotificationCard
                pushType={item.pushType}
                storeName={item.storeName}
                storeId={item.storeId}
                missionId={item.missionId}
                mission={item.subTitle}
                date={item.date}
                checked={item.checked}
                id={item.id}
                goRequest={goRequest}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 8}} />}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={[DesignSystem.centerArrange, {marginBottom: 30}]}>
              <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 38}]}>
                아직 받은 알람이 없어요!
              </Text>

              <Image source={require('../assets/images/bobpool/cryingBobBowl.png')} />
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  flexTop: {},
});
