import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RegisterStoreInterface} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';

type RegisterStoreAddressDetailProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterStoreInterface>>;
  registerData: RegisterStoreInterface;
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterStoreAddressDetail: FC<RegisterStoreAddressDetailProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
  error,
}) => {
  const [focusedDetail, setFocusedDetail] = useState(false);
  return (
    <View>
      <TextInput
        style={[
          styles.nameInput,
          error && focusedDetail
            ? styles.errorBorderFocus
            : error && !focusedDetail
            ? styles.errorBorderNoFocus
            : focusedDetail
            ? styles.focusBorder
            : styles.unfocusBorder,
        ]}
        onChangeText={(text) => {
          onChange(text);
          setRegisterData({...registerData, addressDetail: text});
        }}
        value={value}
        placeholder="상세주소 입력"
        selectionColor={'#6C69FF'}
        onBlur={() => setFocusedDetail(false)}
        onFocus={() => setFocusedDetail(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 8,
    color: '#111111',
  },
  errorBorderFocus: {borderColor: '#E03D32', borderWidth: 1},
  errorBorderNoFocus: {borderColor: '#E03D32', borderWidth: 0.5},
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
});
