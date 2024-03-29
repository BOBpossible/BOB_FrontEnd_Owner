import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type RegisterHeaderProps = {
  goBack: () => void;
  pageNum: number;
  totalPage?: number;
};

export const RegisterHeader: FC<RegisterHeaderProps> = ({goBack, pageNum, totalPage}) => {
  return (
    <View style={[styles.headerWrap]}>
      <TouchableOpacity onPress={goBack}>
        <View style={[styles.backButton]}>
          <Icon name="arrow-left" size={24} color="black" />
        </View>
      </TouchableOpacity>
      {pageNum === 0 && <View />}
      {pageNum === 1 && (
        <View>
          <Text style={[styles.progressText]}>1/{totalPage}</Text>
        </View>
      )}
      {pageNum === 2 && (
        <View>
          <Text style={[styles.progressText]}>2/{totalPage}</Text>
        </View>
      )}
      {pageNum === 3 && (
        <View>
          <Text style={[styles.progressText]}>3/{totalPage}</Text>
        </View>
      )}
      <View style={[styles.backButton, styles.disable]}>
        <Icon name="arrow-left" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    height: 50,
  },
  backButton: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disable: {opacity: 0},
  progressText: {
    color: '#949494',
    fontSize: 16,
  },
});
