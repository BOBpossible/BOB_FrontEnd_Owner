import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {customAxios} from '../../api';
import {RegisterHeader, RegisterNextButton, RegisterTime} from '../../components';
import {RegisterMenuName} from '../../components/Register/RegisterMenuName';
import {RegisterStoreImages} from '../../components/Register/RegisterStoreImages';
import {AuthStackParamList} from '../../nav';
import {useRecoilValue} from 'recoil';
import {registerMenuImage, registerOperationTime, registerStoreImage, storeData} from '../../state';
import {RegisterMenuImages} from '../../components/Register/RegisterMenuImages';
import {postStoreImages, postStoreMenuImages} from '../../api/register';
import {useMutation} from 'react-query';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStoreTime'>;

const RegisterStoreTime = ({navigation}: Props) => {
  const storeImages = useRecoilValue(registerStoreImage);
  const menuImages = useRecoilValue(registerMenuImage);
  const RCstoreData = useRecoilValue(storeData);
  const registerTime = useRecoilValue(registerOperationTime);

  const postRegister = async (data: any) => {
    try {
      const response = await customAxios().post('/api/v1/stores', data);
      console.log('post stores register:', response.data);
      return response.data.result;
    } catch (error) {
      console.log('post stores register:', error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      storeImage: [],
      menuImage: [],
      menuName: '',
    },
  });
  const goBack = () => {
    navigation.goBack();
  };

  const registerMutation = useMutation((postData: any) => postRegister(postData), {
    onSuccess: async (data) => {
      console.log('알림확인 전환 성공: ', data);
      await storeImagesMutation.mutate(data);
      await menuImagesMutation.mutate(data);
    },
    onError: (err) => {
      console.log('알림확인 전환 실패: ', err);
    },
  });

  const storeImagesMutation = useMutation(
    (storeId: number) => postStoreImages(storeImages, storeId),
    {
      onSuccess: (data) => {
        console.log('가게 이미지 업로드 성공', data);
      },
      onError: (err) => {
        console.log('가게 이미지 업로드 실패: ', err);
      },
    },
  );

  const menuImagesMutation = useMutation(
    (storeId: number) => postStoreMenuImages(menuImages, storeId),
    {
      onSuccess: (data) => {
        console.log('메뉴 이미지 업로드 성공: ', data);
      },
      onError: (err) => {
        console.log('메뉴 이미지 업로드 실패: ', err);
      },
    },
  );

  const goNext = async () => {
    const postData = {...RCstoreData, operationTimeVO: registerTime};
    registerMutation.mutate(postData);

    navigation.navigate('MainNavigator');
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <RegisterHeader goBack={() => goBack()} pageNum={2} totalPage={2} />
        <ScrollView style={[styles.flex, styles.formWrap]}>
          <View style={{marginBottom: 20}}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => {
                return (
                  <RegisterStoreImages
                    onChange={onChange}
                    value={value}
                    error={errors.storeImage !== undefined}
                  />
                );
              }}
              name="storeImage"
            />
            {errors.storeImage?.type === 'required' && (
              <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
            )}
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterMenuName
                  onChange={onChange}
                  value={value}
                  error={errors.menuName !== undefined}
                />
              );
            }}
            name="menuName"
          />
          {errors.menuName?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => {
              return (
                <RegisterMenuImages
                  onChange={onChange}
                  value={value}
                  error={errors.menuImage !== undefined}
                />
              );
            }}
            name="storeImage"
          />
          {errors.menuImage?.type === 'required' && (
            <Text style={[styles.errorMessage]}>필수 입력사항입니다.</Text>
          )}

          <RegisterTime />
        </ScrollView>
        <RegisterNextButton
          goNext={handleSubmit(goNext)}
          buttonState={3}
          disabled={
            registerMutation.isLoading ||
            storeImagesMutation.isLoading ||
            menuImagesMutation.isLoading
          }
        />
        {(registerMutation.isLoading ||
          storeImagesMutation.isLoading ||
          menuImagesMutation.isLoading) && (
          <View style={[styles.loading]}>
            <ActivityIndicator />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default RegisterStoreTime;

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
  errorMessage: {color: '#E03D32', marginLeft: 8, marginTop: 4},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
