import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {storeData} from '../../state';

type RegisterStoreNameProps = {
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterStoreName: FC<RegisterStoreNameProps> = ({onChange, value, error}) => {
  const [focusedName, setFocusedName] = useState(false);

  const [RCstoreData, setRCstoreData] = useRecoilState(storeData);

  return (
    <View style={[styles.addressWrap]}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>상호명</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#6C69FF'}}> * </Text>
        </View>
      </View>
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
          setRCstoreData({...RCstoreData, storeName: text});
        }}
        value={value}
        placeholder="상호명 입력"
        placeholderTextColor="#949494"
        selectionColor={'#6C69FF'}
        onBlur={() => setFocusedName(false)}
        onFocus={() => setFocusedName(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addressWrap: {marginTop: 20},
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
