import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';

type MissionUserCardProps = {
  name: string;
  userId?: string;
  time: string;
  minCost: number;
  point: number;
};

//prettier-ignore
export const MissionUserCard: FC<MissionUserCardProps> = ({name, userId, time, minCost, point}) => {
    //const navigation = useNavigation();
    return (
    <View style={[styles.missionCardWrap]}>
      <View style={[styles.missionCard]}>
        <View style={[styles.missionMain]}>
          <View style={[styles.nameBox]}>
              <Text style={[styles.timeText]}>{time.slice(0,5)} 시작</Text>
              <Text style={[DesignSystem.title3SB, {color: '#2A2A2A'}]}>{name}</Text>
              <Text style={[DesignSystem.body2Lt, {color: '#616161', marginBottom: 8}]}>{userId}</Text>
          </View>
          <View>
            <Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>{minCost}원 이상</Text>
              <Text style={[DesignSystem.body1Lt, {color: 'black'}]}>의 식사시 </Text>
              <Text style={[DesignSystem.title4Md, DesignSystem.purple5]}>{point}P 적립</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missionCardWrap: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  missionCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    // height: hp(calHeight(150)),
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameBox: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 0.5,
    marginBottom: 16,
  },
  timeText: {
    fontSize: 14,
    color: '#6C69FF',
    marginBottom: 6,
  },
  missionButtonView: {
    borderWidth: 2,
  },
});
