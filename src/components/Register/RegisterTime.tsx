import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {OperationTime, RegisterStoreInterface} from '../../data';
import {CheckBoxRectangle} from '../common/CheckBoxRectangle';
import {RegisterTimeModal} from '../../modal';
import {DesignSystem} from '../../assets/DesignSystem';
import {useRecoilState} from 'recoil';
import {registerOperationTime} from '../../state';

const MapIndexToDay = ['월', '화', '수', '목', '금', '토', '일'];

const processTime = (time: string) => {
  return time.slice(undefined, 5);
};

export const RegisterTime = () => {
  const [registerTimeModal, setRegisterTimeModal] = useState(false);
  // const [operationTime, setOperationTime] = useState<OperationTime[]>(registerData.operationTimeVO);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [RCOperationTime, setRCOperationTime] = useRecoilState(registerOperationTime);

  // useEffect(() => {
  //   setOperationTime(registerData.operationTimeVO);
  // }, [registerData]);
  const renderedTimeTable = () => {
    return (
      <>
        {RCOperationTime.map((item, index) => {
          if (item.hasOperationTime) {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#FFFFFF'}]} key={index}>
                <View style={[styles.checkboxWrap]}>
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = [...RCOperationTime];
                      tempData[index] = {
                        ...tempData[index],
                        hasOperationTime: !item.hasOperationTime,
                      };
                      setRCOperationTime(tempData);
                    }}
                    isChecked={RCOperationTime[index].hasOperationTime}
                  />
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <TouchableOpacity
                    style={{height: 50, justifyContent: 'center'}}
                    onPress={() => {
                      setDayIndex(index);
                      setRegisterTimeModal(true);
                    }}
                  >
                    <View>
                      <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
                        {processTime(item.startTime)}~{processTime(item.endTime)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <TouchableOpacity style={{height: 50, justifyContent: 'center'}}>
                    <View>
                      <Text style={[DesignSystem.body1Lt, DesignSystem.grey17]}>
                        {processTime(item.breakStartTime)}~{processTime(item.breakEndTime)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#F5F5F5'}]} key={index}>
                <View style={[styles.checkboxWrap]}>
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    onPress={() => {
                      let tempData = [...RCOperationTime];
                      tempData[index] = {
                        ...tempData[index],
                        hasOperationTime: !item.hasOperationTime,
                      };
                      setRCOperationTime(tempData);
                    }}
                    isChecked={item.hasOperationTime}
                  />
                </View>
                <View
                  style={{flex: 0.78, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <Text style={[DesignSystem.body1Lt, DesignSystem.grey8]}>휴무</Text>
                </View>
              </View>
            );
          }
        })}
      </>
    );
  };

  return (
    <View style={[styles.TimeWrap]}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 18}}>
        <Text style={[DesignSystem.h2SB, DesignSystem.grey17]}>운영시간</Text>
        <Text style={{color: '#6C69FF'}}> * </Text>
      </View>
      <View style={[styles.columnWrap]}>
        <View style={{flex: 0.22, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.grey7]}>영업일</Text>
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.grey7]}>영업 시간</Text>
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[DesignSystem.body1Lt, DesignSystem.grey7]}>브레이크 타임</Text>
        </View>
      </View>
      {renderedTimeTable()}
      <RegisterTimeModal
        visible={registerTimeModal}
        closeRegisterTimeModal={() => setRegisterTimeModal(false)}
        index={dayIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TimeWrap: {
    marginTop: 24,
  },
  formHeadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  tableContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  checkboxWrap: {
    flex: 0.22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnWrap: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
});
