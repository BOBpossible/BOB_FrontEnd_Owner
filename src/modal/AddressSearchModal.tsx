import React, {FC, useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, SafeAreaView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Postcode from '@actbase/react-daum-postcode';
import {address} from '../state';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {kakaoGeocoder} from '../api/kakaoGeocoder';
import {useRecoilState} from 'recoil';
import {storeData} from '../state';

type AddressSearchModalProps = {
  visible: boolean;
  closeAddressModal: () => void;
  onChange?: (...event: any[]) => void;
};

const AddressSearchModal: FC<AddressSearchModalProps> = ({
  visible,
  closeAddressModal,
  onChange,
}) => {
  const insets = useSafeAreaInsets();
  const [RCstoreData, setRCstoreData] = useRecoilState(storeData);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.modalHeader, {top: insets.top}]}>
          <TouchableOpacity onPress={closeAddressModal}>
            <View style={[styles.backButton]}>
              <Icon name="arrow-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <Postcode
          style={styles.container}
          jsOptions={{animation: false, hideMapBtn: true}}
          onSelected={async (data) => {
            const coordiate = await kakaoGeocoder(data.address);
            console.log('CCCCOR', coordiate);
            if (coordiate !== undefined) {
              setRCstoreData({
                ...RCstoreData,
                addressStreet: data.address,
                addressDong: data.bname,
                x: coordiate.x,
                y: coordiate.y,
              });
            } else {
              //오류, 좌표 설정 실패
              setRCstoreData({
                ...RCstoreData,
                addressStreet: data.address,
                addressDong: data.bname,
                x: 0,
                y: 0,
              });
            }

            if (onChange !== undefined) {
              onChange(data.address);
            }
            closeAddressModal();
          }}
          onError={function (error: unknown): void {
            throw new Error('Function not implemented.');
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};
export default AddressSearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  backButton: {
    margin: 10,
  },
  modalHeader: {
    position: 'absolute',
    top: 44,
    height: 40,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
});
