import React from 'react';
import type {FC} from 'react';
import {ImageInterface} from '../../data';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RenderUploadImageProps = {
  imageData: ImageInterface[];
  setImageData: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
  imageSize: number;
};

export const RenderUploadImage: FC<RenderUploadImageProps> = ({
  imageData,
  setImageData,
  imageSize,
}) => {
  const removeImage = (name: string) => {
    setImageData((current) =>
      current.filter((image) => {
        return image.name !== name;
      }),
    );
  };

  return (
    <ScrollView horizontal>
      {imageData.map((item, index) => {
        return (
          <View key={index} style={{marginRight: 8, borderColor: '#DFDFDF', borderWidth: 1}}>
            <TouchableOpacity
              onPress={() => {
                removeImage(item.name);
              }}
              style={{position: 'absolute', top: 5, right: 5, zIndex: 1}}
            >
              <View
                style={{
                  backgroundColor: '#2A2A2A',
                  width: 18,
                  height: 18,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name="close" size={14} color="#DFDFDF" />
              </View>
            </TouchableOpacity>
            <Image source={{uri: item.uri}} style={{width: imageSize, height: imageSize}} />
          </View>
        );
      })}
    </ScrollView>
  );
};
