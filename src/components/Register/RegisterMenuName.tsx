import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RegisterStoreInterface} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {storeData} from '../../state';

type RegisterMenuNameProps = {
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterMenuName: FC<RegisterMenuNameProps> = ({onChange, value, error}) => {
  const [focusedName, setFocusedName] = useState(false);
  const [RCstoreData, setRCstoreData] = useRecoilState(storeData);

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>대표메뉴</Text>
        <Text style={{color: '#6C69FF'}}> * </Text>
      </View>
      <Text style={[DesignSystem.body2Lt, DesignSystem.grey9, {marginBottom: 12}]}>
        대표메뉴 미션을 위해 사용됩니다.
      </Text>
      <TextInput
        style={[
          styles.nameInput,
          DesignSystem.grey17,
          error && focusedName
            ? styles.errorBorderFocus
            : error && !focusedName
            ? styles.errorBorderNoFocus
            : focusedName
            ? styles.focusBorder
            : styles.unfocusBorder,
        ]}
        onChangeText={(text) => {
          onChange(text);
          setRCstoreData({...RCstoreData, representativeMenuName: text});
        }}
        value={value}
        placeholder="대표메뉴 이름 입력"
        placeholderTextColor="#949494"
        selectionColor={'#6C69FF'}
        onBlur={() => setFocusedName(false)}
        onFocus={() => setFocusedName(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    color: '#111111',
  },
  errorBorderFocus: {borderColor: '#E03D32', borderWidth: 1},
  errorBorderNoFocus: {borderColor: '#E03D32', borderWidth: 0.5},
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
  },
  formSubText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#777777',
    marginBottom: 12,
  },
});
