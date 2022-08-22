import React from 'react';
import type {FC} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageInterface} from '../../data';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {registerMenuImage} from '../../state';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
  maxHeight: 1600,
  maxWidth: 1000,
};

type RegisterMenuImagesProps = {
  onChange: (...event: any[]) => void;
  value: ImageInterface[];
  error: boolean;
};

export const RegisterMenuImages: FC<RegisterMenuImagesProps> = ({onChange, value, error}) => {
  const [menuImages, setMenuImages] = useRecoilState(registerMenuImage);
  //이미지 등록 시작!
  const openImagePicker = () => {
    Alert.alert('사진', '어떻게 가져올까요?', [
      {
        text: '카메라 ',
        onPress: () => selectImageFromCamera(),
      },
      {text: '갤러리 선택', onPress: () => selectImageFromGallery()},
    ]);
  };

  const selectImageFromGallery = async () => {
    const result = await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('취소');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }
    });
    if (result.assets) {
      const data: ImageInterface = {
        uri: result.assets[0].uri as string,
        type: result.assets[0].type as string,
        name: result.assets[0].fileName as string,
      };
      setMenuImages([...menuImages, data]);
      onChange([...value, data]);
    }
    console.log(result);
  };

  const selectImageFromCamera = async () => {
    const result = await launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('취소');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }
    });
    if (result.assets) {
      const data: ImageInterface = {
        uri: result.assets[0].uri as string,
        type: result.assets[0].type as string,
        name: result.assets[0].fileName as string,
      };
      setMenuImages([...menuImages, data]);
      onChange([...value, data]);
    }
    console.log(result);
  };
  //여기까지 이미지 등록!
  const removeImage = (imageName: string) => {
    setMenuImages((current) =>
      current.filter((image) => {
        return image.name !== imageName;
      }),
    );
  };

  return (
    <View style={[styles.ImageSelectContainer]}>
      <View style={[styles.flexRow, {alignItems: 'baseline', marginBottom: 8}]}>
        <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>대표메뉴 사진 등록</Text>
        <Text style={[DesignSystem.body2Lt, DesignSystem.grey9]}> {menuImages.length}/3</Text>
      </View>
      <View style={[styles.flexRow, {alignItems: 'center'}]}>
        <TouchableOpacity
          style={
            menuImages.length > 2
              ? [styles.imageAddButton, {opacity: 0.2}]
              : [styles.imageAddButton]
          }
          onPress={openImagePicker}
          disabled={menuImages.length > 2}
        >
          <Icon name="plus" size={24} color="#111111" />
        </TouchableOpacity>
        <ScrollView horizontal>
          {menuImages.map((data, index) => {
            return (
              <View style={{marginRight: 8}} key={index}>
                <TouchableOpacity
                  onPress={() => {
                    removeImage(data.name);
                  }}
                  style={{position: 'absolute', top: 5, right: 5, zIndex: 1}}
                >
                  <View style={[styles.removeImageX]}>
                    <Icon name="close" size={14} color="#DFDFDF" />
                  </View>
                </TouchableOpacity>
                <Image
                  source={{uri: data.uri}}
                  style={{width: 80, height: 80, borderColor: '#DFDFDF', borderWidth: 1}}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageAddButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    marginRight: 8,
  },
  flexRow: {
    flexDirection: 'row',
  },
  ImageSelectContainer: {
    width: '100%',
    marginTop: 24,
  },
  removeImageX: {
    backgroundColor: '#2A2A2A',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
