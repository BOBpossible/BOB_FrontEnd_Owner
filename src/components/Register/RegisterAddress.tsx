import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AddressSearchModal from '../../modal/AddressSearchModal';
import {useRecoilValue} from 'recoil';
import {address} from '../../state';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

type RegisterAddressProps = {
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterAddress: FC<RegisterAddressProps> = ({onChange, value, error}) => {
  const [addressModal, setAddressModal] = useState(false);

  return (
    <View style={[styles.addressWrap]}>
      <AddressSearchModal
        visible={addressModal}
        closeAddressModal={() => setAddressModal(false)}
        onChange={onChange}
      />
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>가게 주소</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#6C69FF'}}> * </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setAddressModal(true)}>
        <View
          style={[
            styles.nameInput,
            styles.spacebetweenWrap,
            error ? styles.errorBorderNoFocus : styles.unfocusBorder,
          ]}
        >
          <Text style={[value === '' ? styles.placeholder : DesignSystem.grey17]}>
            {value === '' ? '주소 선택' : value}
          </Text>
          <Icon name="chevron-down" size={24} color="#111111" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addressWrap: {marginTop: 0},
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
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
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  errorBorderNoFocus: {borderColor: '#E03D32', borderWidth: 0.5},
  spacebetweenWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 24,
    color: '#949494',
  },
});
