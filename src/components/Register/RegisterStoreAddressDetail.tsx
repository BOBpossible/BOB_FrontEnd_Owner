import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {storeData} from '../../state';

type RegisterStoreAddressDetailProps = {
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterStoreAddressDetail: FC<RegisterStoreAddressDetailProps> = ({
  onChange,
  value,
  error,
}) => {
  const [focusedDetail, setFocusedDetail] = useState(false);
  const [RCstoreData, setRCstoreData] = useRecoilState(storeData);

  return (
    <View>
      <TextInput
        style={[
          styles.nameInput,
          DesignSystem.grey17,
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
          setRCstoreData({...RCstoreData, addressDetail: text});
        }}
        value={value}
        placeholder="상세주소 입력"
        placeholderTextColor={'#949494'}
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
