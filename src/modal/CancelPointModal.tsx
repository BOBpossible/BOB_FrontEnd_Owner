import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import {TimeList} from '../data/TimeList';

type OperationTimeModalProps = {
  visible: boolean;
  closeCancelPointModal: () => void;
};

export const CancelPointModal: FC<OperationTimeModalProps> = ({visible, closeCancelPointModal}) => {
  const [selectYes, setSelectYes] = useState(false);

  const handleSubmit = async () => {
    //post로 서버에 내용 보내기

    setSelectYes(true);
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View style={styles.modalWrap}>
        {selectYes ? (
          <View style={styles.modalContainer}>
            <View style={styles.warningContainer}>
              <Text style={styles.headText}>결제 취소가 요청 되었습니다.</Text>
              <Text style={styles.fieldText}>해당 요청의 사실 확인을 위해</Text>
              <Text style={styles.fieldText}>연락이 갈 수 있습니다.</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={closeCancelPointModal} style={styles.buttonOk}>
                <Text style={styles.yesText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <View style={styles.warningContainer}>
              <Image
                source={require('../assets/images/warning.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={styles.headText}>포인트 적립을 정말 취소하시겠습니까?</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={closeCancelPointModal}>
                <View style={styles.buttonNo}>
                  <Text style={styles.noText}>아니요</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.buttonYes}>
                  <Text style={styles.yesText}>네</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrap: {justifyContent: 'flex-end', alignItems: 'center', flex: 1, backgroundColor: 'none'},
  modalContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  warningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    marginTop: 34,
    flexDirection: 'row',
  },
  buttonNo: {
    width: 163,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  noText: {color: '#111111', fontFamily: 'Pretendard-Regular', fontSize: 18, lineHeight: 24},
  buttonYes: {
    width: 163,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesText: {color: '#FFFFFF', fontFamily: 'Pretendard-Regular', fontSize: 18, lineHeight: 24},
  buttonOk: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontFamily: 'Pretendard-Medium',
    color: '#111111',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 12,
  },
  fieldText: {
    fontFamily: 'Pretendard-Light',
    color: '#616161',
    fontSize: 16,
    lineHeight: 24,
  },
});