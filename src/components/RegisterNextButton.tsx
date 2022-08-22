import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type RegisterNextButtonProps = {
  goNext: () => void;
  disabled?: boolean;
  buttonState: number;
  title?: string;
};

export const RegisterNextButton: FC<RegisterNextButtonProps> = ({
  goNext,
  disabled,
  buttonState,
}) => {
  return (
    <TouchableOpacity onPress={goNext} style={[styles.buttonWrap]} disabled={disabled}>
      <View
        style={[
          styles.buttonStyle,
          buttonState === 0
            ? styles.stateDisabledButton
            : buttonState === 1
            ? styles.stateNextButton
            : styles.stateFinishButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            buttonState === 0 ? styles.stateDisabledText : styles.stateNextText,
          ]}
        >
          {buttonState === 2 ? '확인' : buttonState === 3 ? '밥플레이스 시작하기' : '다음'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {justifyContent: 'center', alignItems: 'center', margin: 20},
  buttonStyle: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  stateDisabledButton: {backgroundColor: '#E8E8E8'},
  stateNextButton: {backgroundColor: '#2A2A2A'},
  stateFinishButton: {backgroundColor: '#615EFF'},
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stateDisabledText: {
    color: '#C8C8C8',
  },
  stateNextText: {
    color: '#FFFFFF',
  },
});
