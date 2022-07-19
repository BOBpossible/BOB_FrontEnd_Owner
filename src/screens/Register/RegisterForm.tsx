import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RegisterNextButton, RegisterHeader, RegisterName, RegisterGender} from '../../components';
import {RegisterInterface} from '../../data/IRegister';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../nav';
import {useForm, Controller} from 'react-hook-form';
import {customAxios} from '../../api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterForm'>;

const RegisterForm = ({navigation, route}: Props) => {
  const [registerData, setRegisterData] = useState<RegisterInterface>(route.params.registerData);
  const [authError, setAuthError] = useState(true);
  //react-hook-form 사용
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      gender: '',
      address: '',
      phone: '',
    },
  });

  useEffect(() => {
    setRegisterData(route.params.registerData);
  }, []);

  const postRegister = async () => {
    try {
      const response = await customAxios().post('/api/v1/owners', registerData);
      console.log('post register:', response.data);
    } catch (error) {
      console.log('post register:', error);
    }
  };
  const onSubmit = async (data: any) => {
    await postRegister();
    console.log('다음 누름');
    navigation.navigate('RegisterDone', {status: 0});
  };

  const goBack = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={[styles.flex]}>
      <RegisterHeader goBack={goBack} pageNum={1} totalPage={1} />
      {/* <KeyboardAvoidingView
        style={[{flex: 1}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      > */}
      <KeyboardAwareScrollView
        style={[styles.flex, styles.formWrap]}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.RegisterFormTitle]}>가입자 정보</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => {
            return (
              <RegisterName
                setRegisterData={setRegisterData}
                registerData={registerData}
                onChange={onChange}
                value={value}
                error={errors.name !== undefined}
              />
            );
          }}
          name="name"
        />
        {errors.name?.type === 'required' && (
          <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => {
            return (
              <RegisterGender
                setRegisterData={setRegisterData}
                registerData={registerData}
                onChange={onChange}
                value={value}
                error={errors.gender !== undefined}
              />
            );
          }}
          name="gender"
        />
        {errors.gender?.type === 'required' && (
          <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
        )}
        {/* 휴대폰 인증 잠시 주석처리 */}
        {/* <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              authValid: (value) => {
                return !authError;
              },
            },
          }}
          render={({field: {onChange, value}}) => {
            return (
              <RegisterPhone
                setRegisterData={setRegisterData}
                registerData={registerData}
                onChange={onChange}
                value={value}
                authError={authError}
                setAuthError={setAuthError}
                isError={errors.phone !== undefined}
              />
            );
          }}
          name="phone"
        /> */}
        {errors.phone?.type === 'required' && (
          <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
        )}
        {authError && <Text style={[styles.errorMessage]}>인증이 완료되지 않았습니다.</Text>}
        {!authError && <Text style={[styles.clearMessage]}>인증이 완료되었습니다.</Text>}

        {errors.address?.type === 'required' && (
          <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
        )}
      </KeyboardAwareScrollView>
      <RegisterNextButton goNext={handleSubmit(onSubmit)} buttonState={isValid ? 1 : 0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  formWrap: {marginLeft: 16, marginRight: 16},
  RegisterFormTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  errorMessage: {color: '#E03D32', marginLeft: 8, marginTop: 4},
  clearMessage: {color: '#6C69FF', marginLeft: 8, marginTop: 4},
});

export default RegisterForm;
