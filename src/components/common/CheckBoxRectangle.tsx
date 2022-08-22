import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

type CheckBoxRectangleProps = {
  onPress: () => void;
  title?: string;
  isChecked: boolean;
};

export const CheckBoxRectangle: FC<CheckBoxRectangleProps> = ({onPress, title, isChecked}) => {
  return (
    <View style={[styles.container, title !== undefined && {width: '100%'}]}>
      <Pressable onPress={onPress}>
        <View style={isChecked ? styles.markedCircle : styles.unmarkedCircle}>
          <Icon
            name="check"
            size={18}
            color="#FFFFFF"
            style={isChecked ? styles.markedCheck : styles.unmarkedCheck}
          />
        </View>
      </Pressable>
      <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, styles.title]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // width: '100%',
    marginLeft: 4,
  },
  title: {
    marginLeft: 16,
  },
  markedCircle: {
    width: 18,
    height: 18,
    backgroundColor: '#616161',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unmarkedCircle: {
    width: 18,
    height: 18,
    backgroundColor: 'transparent',
    borderColor: '#DFDFDF',
    borderWidth: 2,
  },
  markedCheck: {opacity: 1},
  unmarkedCheck: {opacity: 0},
});
