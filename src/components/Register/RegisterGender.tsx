import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RegisterInterface} from '../../data';
import {DesignSystem} from '../../assets/DesignSystem';

type RegisterGenderProps = {
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterInterface>>;
  registerData: RegisterInterface;
  onChange: (...event: any[]) => void;
  value: string;
  error: boolean;
};

export const RegisterGender: FC<RegisterGenderProps> = ({
  setRegisterData,
  registerData,
  onChange,
  value,
  error,
}) => {
  return (
    <View style={[styles.genderWrap]}>
      <Text style={[styles.formHeadText, DesignSystem.grey14, DesignSystem.h2SB]}>성별</Text>
      <View style={[styles.spacebetweenWrap]}>
        <TouchableOpacity
          onPress={() => {
            onChange('MALE');
            setRegisterData({...registerData, gender: 'MALE'});
          }}
        >
          <View
            style={[
              styles.genderBox,
              error
                ? styles.errorBorderNoFocus
                : value === 'MALE'
                ? styles.genderChecked
                : styles.genderUnchecked,
            ]}
          >
            <Text
              style={
                value === 'MALE'
                  ? [DesignSystem.title4Md, DesignSystem.purple5]
                  : [DesignSystem.body1Lt, DesignSystem.grey10]
              }
            >
              남자
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onChange('FEMALE');
            setRegisterData({...registerData, gender: 'FEMALE'});
          }}
        >
          <View
            style={[
              styles.genderBox,
              error
                ? styles.errorBorderNoFocus
                : value === 'FEMALE'
                ? styles.genderChecked
                : styles.genderUnchecked,
            ]}
          >
            <Text
              style={
                value === 'FEMALE'
                  ? [DesignSystem.title4Md, DesignSystem.purple5]
                  : [DesignSystem.body1Lt, DesignSystem.grey10]
              }
            >
              여자
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onChange('NONE');
            setRegisterData({...registerData, gender: 'NONE'});
          }}
        >
          <View
            style={[
              styles.genderBox,
              error
                ? styles.errorBorderNoFocus
                : value === 'NONE'
                ? styles.genderChecked
                : styles.genderUnchecked,
            ]}
          >
            <Text
              style={
                value === 'NONE'
                  ? [DesignSystem.title4Md, DesignSystem.purple5]
                  : [DesignSystem.body1Lt, DesignSystem.grey10]
              }
            >
              선택 안함
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formHeadText: {
    marginBottom: 10,
  },
  spacebetweenWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderChecked: {
    borderColor: '#6C69FF',
    backgroundColor: '#F6F6FE',
    color: '#6C69FF',
  },
  genderUnchecked: {
    borderColor: '#DFDFDF',
  },
  errorBorderNoFocus: {
    borderColor: '#E03D32',
    borderWidth: 0.5,
  },
  genderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 24,
    color: '#949494',
  },
  genderWrap: {marginTop: 28},
});
