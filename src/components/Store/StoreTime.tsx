import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {OperationTime} from '../../data';
import {CheckBoxRectangle} from '../common/CheckBoxRectangle';
import {DesignSystem} from '../../assets/DesignSystem';

type RegisterTimeProps = {
  operationData: OperationTime[];
};

const MapIndexToDay = ['월', '화', '수', '목', '금', '토', '일'];

const processTime = (time: string) => {
  return time.slice(undefined, 5);
};

export const StoreTime: FC<RegisterTimeProps> = ({operationData}) => {
  // console.log('opopop', operationData); //가게정보화면에서 리뷰를 눌렀는데 이게 왜 다시 콘솔에 찍히는거지 ?
  const renderedTimeTable = () => {
    return (
      <>
        {operationData.map((item, index) => {
          if (item.hasOperationTime) {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#FFFFFF'}]} key={index}>
                <View
                  style={{
                    flex: 0.22,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    isChecked={item.hasOperationTime}
                    onPress={() => {}}
                  />
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <View style={{height: 50, justifyContent: 'center'}}>
                    <Text>
                      {processTime(item.startTime)}~{processTime(item.endTime)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}
                >
                  <View style={{height: 50, justifyContent: 'center'}}>
                    {item.hasBreak ? (
                      <Text>
                        {processTime(item.breakStartTime)}~{processTime(item.breakEndTime)}
                      </Text>
                    ) : (
                      <Text>없음</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          } else {
            return (
              <View style={[styles.tableContainer, {backgroundColor: '#F5F5F5'}]} key={index}>
                <View
                  style={{
                    flex: 0.22,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CheckBoxRectangle
                    title={MapIndexToDay[index]}
                    isChecked={item.hasOperationTime}
                    onPress={() => {}}
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
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          borderBottomColor: '#DFDFDF',
          borderBottomWidth: 1,
        }}
      >
        <View style={{flex: 0.22, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text>영업일</Text>
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text>영업 시간</Text>
        </View>
        <View style={{flex: 0.39, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text>브레이크 타임</Text>
        </View>
      </View>
      {/* {renderedTimeTable()} */}
      {/* 기존코드. 근데 가게관리에서 리뷰로 넘어가면 오류남 operationData가 undefined로 뜨는이슈.. */}
      {operationData !== undefined && renderedTimeTable()}
      {/* 이렇게하면 위같은 오류는 안나는데, 다시 가게정보로 돌아왔을때 다 빈칸임. 왜냐면 다시 operationData가 undefiend래. */}
    </View>
  );
};

const styles = StyleSheet.create({
  TimeWrap: {
    marginTop: 20,
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
});
