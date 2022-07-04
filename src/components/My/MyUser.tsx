import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MyUserProps = {
  authentication: boolean;
  email: string;
  name: string;
  point: number;
};

//prettier-ignore
export const MyUser: FC<MyUserProps> = ({authentication, email, name, point }) => {
  const [statusMessage, setMessage] = useState('');
  useEffect(()=>{
    if (!authentication) {setMessage('미인증')}
    else {setMessage('')}
  }, [authentication]);
  const navigation = useNavigation();

  return (
    <View style={[styles.userInfo]}>
      <View style={{marginLeft: 16, marginRight:16}}>
        <View style={[styles.userCard]}>
          <Image
            style={[styles.profileImg]}
            source={require('../../assets/images/bobProfile.png')} //
          />
          <View style={[styles.userWrap]}>
            <View style={[styles.username]}>
              <Text style={[DesignSystem.title3SB, styles.usernameText]}>{name}님</Text>
              <Text style={[DesignSystem.caption1Lt, {color: '#E03D32'}]}>{statusMessage}</Text>
            </View>
            <Text style={[DesignSystem.caption1Lt, styles.userEmail]}>{email}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MyEditUserInfo', {username: name, auth: statusMessage})}>
            <View style={[styles.editUserInfo]}>
              <Text style={[DesignSystem.caption1Lt, {color: '#6C69FF'}]}>회원정보 수정</Text>
              <Image
                style={{width: 24}}
                source={require('../../assets/images/arrowGrey8.png')} //
              />
            </View>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    height: 80,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 18,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  username: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    color: '#111111',
    marginRight: 8,
  },
  userEmail: {
    color: '#616161',
  },
  statusWrap: {
    marginRight: 24,
    justifyContent: 'center',
  },
  statusText: {
    color: '#111111',
    fontSize: 16,
  },
  editUserInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPointWrap: {
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MyNextImg: {
    marginRight: 20,
  },
});
