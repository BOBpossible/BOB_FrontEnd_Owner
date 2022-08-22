import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../assets/DesignSystem';

type CheckBoxProps = {
  onPress: () => void;
  title: string;
  isChecked: boolean;
  isCheckAll?: boolean;
};

export const CheckBox: FC<CheckBoxProps> = ({onPress, title, isChecked, isCheckAll}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={isChecked ? styles.markedCircle : styles.unmarkedCircle}>
          <Icon
            name="check"
            size={14}
            color="#FFFFFF"
            style={isChecked ? styles.markedCheck : styles.unmarkedCheck}
          />
        </View>

        <Text
          style={[DesignSystem.grey17, isCheckAll ? DesignSystem.title3SB : DesignSystem.body1Lt]}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
  },
  markedCircle: {
    width: 18,
    height: 18,
    backgroundColor: '#6C69FF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  unmarkedCircle: {
    width: 18,
    height: 18,
    backgroundColor: 'transparent',
    borderRadius: 18,
    borderColor: '#DFDFDF',
    borderWidth: 2,
    marginRight: 16,
  },
  markedCheck: {opacity: 1},
  unmarkedCheck: {opacity: 0},
});
