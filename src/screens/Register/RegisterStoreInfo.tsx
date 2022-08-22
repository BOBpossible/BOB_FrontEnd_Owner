import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {RegisterAddress, RegisterHeader, RegisterNextButton} from '../../components';
import {AuthStackParamList} from '../../nav';
import {useForm, Controller} from 'react-hook-form';
import {RegisterStoreName} from '../../components/Register/RegisterStoreName';
import {RegisterStoreType} from '../../components/Register/RegisterStoreType';
import {RegisterStoreTable} from '../../components/Register/RegisterStoreTable';
import {RegisterStoreIntro} from '../../components/Register/RegisterStoreIntro';
import {RegisterStoreAddressDetail} from '../../components/Register/RegisterStoreAddressDetail';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStoreInfo'>;

const RegisterStoreInfo = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      storeName: '',
      storeIntro: '',
      storeTypeId: -1,
      tableNum: -1,
      address: '',
      addressDetail: '',
    },
  });
  const goBack = () => {
    navigation.navigate('Login');
  };

  const onSubmit = () => {
    navigation.navigate('RegisterStoreTime');
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <RegisterHeader goBack={() => goBack()} pageNum={1} totalPage={2} />
        <KeyboardAvoidingView
          style={[{flex: 1}]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView style={[styles.flex, styles.formWrap]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Text style={[styles.RegisterFormTitle]}>영업정보</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#6C69FF'}}>* </Text>
                <Text style={[DesignSystem.caption1Lt, DesignSystem.grey10]}>필수입력</Text>
              </View>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterStoreName
                    onChange={onChange}
                    value={value}
                    error={errors.storeName !== undefined}
                  />
                );
              }}
              name="storeName"
            />
            {errors.storeName?.type === 'required' ? (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            ) : (
              <View style={{height: 20}} />
            )}

            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({field: {onChange, value}}) => {
                return <RegisterStoreIntro onChange={onChange} value={value} error={false} />;
              }}
              name="storeIntro"
            />
            <View style={{height: 20}} />

            {/* 주소 */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <>
                    <RegisterAddress
                      onChange={onChange}
                      value={value}
                      error={errors.address !== undefined}
                    />
                  </>
                );
              }}
              name="address"
            />
            {errors.address?.type === 'required' && (
              <Text style={[styles.errorMessage, {marginBottom: 0}]}>필수 입력사항입니다.</Text>
            )}
            {/* 상세주소 */}
            <View style={{marginBottom: 20}}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({field: {onChange, value}}) => {
                  return (
                    <>
                      <RegisterStoreAddressDetail
                        onChange={onChange}
                        value={value}
                        error={errors.addressDetail !== undefined}
                      />
                    </>
                  );
                }}
                name="addressDetail"
              />
            </View>
            {/* {errors.addressDetail?.type === 'required' ? (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          ) : (
            <View style={{height: 20}} />
          )} */}

            {/* 가게유형 */}
            <Controller
              control={control}
              rules={{
                min: 0,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterStoreType
                    onChange={onChange}
                    value={value}
                    error={errors.storeTypeId !== undefined}
                  />
                );
              }}
              name="storeTypeId"
            />
            {errors.storeTypeId?.type === 'min' ? (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            ) : (
              <View style={{height: 20}} />
            )}

            <Controller
              control={control}
              rules={{
                min: 0,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterStoreTable
                    onChange={onChange}
                    value={value}
                    error={errors.tableNum !== undefined}
                  />
                );
              }}
              name="tableNum"
            />
            {errors.tableNum?.type === 'min' ? (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            ) : (
              <View style={{height: 20}} />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
        <RegisterNextButton goNext={handleSubmit(onSubmit)} buttonState={1} />
      </SafeAreaView>
    </>
  );
};

export default RegisterStoreInfo;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  RegisterFormTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  formWrap: {marginLeft: 16, marginRight: 16},
  errorMessage: {color: '#E03D32', marginLeft: 8, marginTop: 4, marginBottom: 20},
});
