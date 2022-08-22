import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import SocialWebviewModal from '../modal/SocialWebviewModal';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStackParamList} from '../nav';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {customAxios} from '../api';
import {calWidth} from '../assets/CalculateLength';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [source, setSource] = useState('');

  const postLogin = async (data: any) => {
    try {
      const response = await customAxios().post('/auth/authorization/login', null, {
        params: data,
      });
      try {
        await AsyncStorage.multiSet([
          ['accessToken', response.data.result.accessToken],
          ['refreshToken', response.data.result.refreshToken],
        ]);
      } catch (e) {
        console.log('로그인 로컬 저장 에러남...');
      }
      if (response.data.result.registerStatus === 'NEW') {
        navigation.navigate('Register');
      }
      if (response.data.result.registerStatus === 'JOINED') {
        navigation.navigate('RegisterDone', {status: 0});
      }
      if (response.data.result.registerStatus === 'WAIT') {
        navigation.navigate('RegisterDone', {status: 1});
      }
      if (response.data.result.registerStatus === 'APPROVED') {
        // const tempRegisterStore = createStore(); //초기 빈값으로 틀 만들기 - 리코일하며 없어도될듯
        navigation.navigate('RegisterStoreInfo');
      }
      if (response.data.result.registerStatus === 'DONE') {
        navigation.navigate('MainNavigator');
      }
      return response.data;
      // messaging()
      //   .getToken()
      //   .then((token) => {
      //     return postFcmToken(token);
      //   });
    } catch (error) {
      console.log('login data:', error);
    }
  };

  const postAppleLogin = async (token: any) => {
    try {
      const response = await customAxios().post('/auth/authorization/apple-login', {token: token});
      try {
        await AsyncStorage.multiSet([
          ['accessToken', response.data.result.accessToken],
          ['refreshToken', response.data.result.refreshToken],
        ]);
      } catch (e) {
        console.log('로그인 로컬 저장 에러남...');
      }
      if (response.data.result.registerStatus === 'NEW') {
        navigation.navigate('Register');
      }
      if (response.data.result.registerStatus === 'JOINED') {
        navigation.navigate('RegisterDone', {status: 0});
      }
      if (response.data.result.registerStatus === 'WAIT') {
        navigation.navigate('RegisterDone', {status: 1});
      }
      if (response.data.result.registerStatus === 'APPROVED') {
        navigation.navigate('RegisterStoreInfo');
      }
      if (response.data.result.registerStatus === 'DONE') {
        navigation.navigate('MainNavigator');
      }
      return response.data;
      // messaging()
      //   .getToken()
      //   .then((token) => {
      //     return postFcmToken(token);
      //   });
    } catch (error) {
      console.log('애플 로그인 실패:', error);
    }
  };

  // 실행시 구글 로그인 설정 + 로그인 확인 코드
  useEffect(() => {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        webClientId: '875664333601-5s6lcjtitip88ghan2of1f53sikep0bs.apps.googleusercontent.com',
      });
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked');
      });
    } else {
      GoogleSignin.configure({
        webClientId: '875664333601-gdsrl919s9db2bqcre9emulifoa8rrp6.apps.googleusercontent.com',
      });
    }
  }, []);

  const signUpWithSNS = async (social: string) => {
    setSource(`https://bobpossible.shop/oauth2/authorization/${social}`);
    setLoginModal(true);
  };

  const onGoogleButtonPress = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const data = {
        name: userInfo.user.name,
        email: userInfo.user.email,
      };
      postLogin(data);
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('onGoogleButtonPress ERROR', err);
    }
  };

  const onAppleButtonPress = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken} = appleAuthRequestResponse;
        const data = identityToken;
        postAppleLogin(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle={'dark-content'} backgroundColor="white" />
        {/* 개발 단계시 홈과 가입으로 가는 버튼 */}
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={goMain}>
            <View style={{height: 30, width: 30, borderWidth: 1}}>
              <Text>홈</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={goRegister}>
            <View style={{height: 30, width: 30, borderWidth: 1}}>
              <Text>가입</Text>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={[styles.loginTitle]}>
          <Image
            source={require('../assets/images/ownerAll.png')}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </View>
        {/* <View style={[styles.logoWrap]}>
          <Image
            source={require('../assets/images/bobpool/ownerBob.png')}
            style={[styles.logoImage]}
          />
        </View> */}
        <SocialWebviewModal
          visible={loginModal}
          source={source}
          closeSocialModal={() => setLoginModal(false)}
        />
        <View style={[styles.loginButtonWrap]}>
          <TouchableOpacity onPress={() => signUpWithSNS('kakao')}>
            <Image
              style={[styles.iconButton]}
              source={require('../assets/images/kakaoButton.png')}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => signUpWithSNS('naver')}>
          <Image style={[styles.iconButton]} source={require('../assets/images/naverButton.png')} />
        </TouchableOpacity> */}
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => onAppleButtonPress()}>
              <Image
                style={[styles.iconButton]}
                source={require('../assets/images/AppleLogin.png')}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onGoogleButtonPress()}>
            <Image
              style={[styles.iconButton]}
              source={require('../assets/images/GoogleLogin.png')}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 80, //디버깅용 메뉴 사라지면 53
  },
  loginHeadText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 56,
    lineHeight: 65,
  },
  loginSubHeadText: {
    fontFamily: 'Pretendard-Light',
    color: '#616161',
    fontSize: 23,
  },
  titleImage: {
    width: wp(calWidth(344)),
    height: 329,
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 230,
    height: 226,
  },
  loginButtonWrap: {
    marginBottom: 60,
    alignItems: 'center',
  },
  iconButton: {
    width: 340,
    height: 44,
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default Login;
