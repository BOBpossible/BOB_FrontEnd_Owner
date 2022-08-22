import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyUser} from '../../components/My/MyUser';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';
import {queryKey} from '../../api/queryKey';
import {useQuery} from 'react-query';
import {IgetUsersMe} from '../../data/IUser';
import {getUserInfo} from '../../api/user';
import QuitModal from '../../modal/QuitModal';

const MyPage = () => {
  const navigation = useNavigation();
  const [quitModal, setQuitModal] = useState(false);

  const logout = async () => {
    await AsyncStorage.multiSet([
      ['accessToken', ''],
      ['refreshToken', ''],
    ]);
    navigation.navigate('AuthNavigator');
  };
  console.log(AsyncStorage.getItem('userToken'));
  const {data, isError, refetch, isLoading} = useQuery<IgetUsersMe>(queryKey.USERINFO, getUserInfo);
  // console.log('유저정보', data); // {"authentication": false, "email": "yejin9487@daum.net", "name": "23", "point": 0, "userId": 730}

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <View style={[styles.headerWrap]}>
          <Text style={[styles.headerText, DesignSystem.h2SB]}>마이페이지</Text>
        </View>
        {data !== undefined ? (
          <MyUser email={data.email} name={data.name} />
        ) : (
          <MyUser email={'Undefiend Data'} name={''} />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('MyNotificationsSetting')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[styles.userMenu]}>알림 설정</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyInquiry')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[styles.userMenu]}>1:1 문의</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://forms.gle/GUJiARkGXMXhmzKV7')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[styles.userMenu]}>의견 남기기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[styles.userMenu]}>로그아웃</Text>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'flex-end', marginTop: 14, marginRight: 16}}>
          <TouchableOpacity onPress={() => setQuitModal(true)}>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
        <QuitModal visible={quitModal} closeQuitModal={() => setQuitModal(false)} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  headerWrap: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  headerText: {
    color: 'black',
    marginLeft: 16,
  },
  myMenuWrap: {
    width: '100%',
    height: 68,
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    justifyContent: 'center',
  },
  userMenu: {
    marginLeft: 22,
    fontSize: 16,
    color: '#111111',
  },
});

export default MyPage;
