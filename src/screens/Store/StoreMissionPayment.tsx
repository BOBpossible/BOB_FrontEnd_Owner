import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreStackParamList} from '../../nav/StoreNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {CancelPointModal} from '../../modal/CancelPointModal';
import {DesignSystem} from '../../assets/DesignSystem';
import {dayofweekType} from '../../data/IMissions';

type Props = StackScreenProps<StoreStackParamList, 'StoreMissionPayment'>;

const StoreMissionPayment = ({navigation, route}: Props) => {
  const [cancelPointModal, setCancelPointModal] = useState(false);
  const [cancelContent, setCancelContent] = useState('');
  const DAYOFWEEK: dayofweekType = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 0}} />
      <SafeAreaView style={[styles.flex]}>
        <View style={[styles.screenHeaderWrap]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={[DesignSystem.title4Md, {color: 'black'}]}>적립 취소 요청</Text>
          <Icon name="arrow-left" size={24} color="black" style={{opacity: 0}} />
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView scrollEnabled={false} style={{flex: 1}}>
            <View style={[styles.missionCard]}>
              <View style={[styles.cancelWrap]}>
                <View style={[styles.cancelTextWrap]}>
                  <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>상세정보</Text>
                </View>
              </View>
              <View style={[styles.seperateLine]} />
              <View style={[styles.infoRow]}>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>고객명</Text>
                <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>
                  {route.params.name}
                </Text>
              </View>
              <View style={[styles.infoRow]}>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>결제일</Text>
                <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>
                  {route.params.successDate.slice(0, 4)}.{route.params.successDate.slice(5, 7)}.
                  {route.params.successDate.slice(8, 10)} {DAYOFWEEK[route.params.dayOfWeek]}요일{' '}
                  {route.params.successDate.slice(11, 19)}
                </Text>
              </View>
              <View style={[styles.infoRow]}>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>포인트</Text>
                <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>
                  {route.params.point}P
                </Text>
              </View>
              <View style={[styles.infoRow]}>
                <Text style={[DesignSystem.body1Lt, DesignSystem.grey10]}>구분번호</Text>
                <Text style={[DesignSystem.title4Md, DesignSystem.grey17]}>
                  {route.params.phone}
                </Text>
              </View>
            </View>
            <View style={[styles.cancelBox]}>
              <Text style={[DesignSystem.title4Md, DesignSystem.grey17, {marginBottom: 8}]}>
                취소 사유
              </Text>
              <TextInput
                style={[styles.cancelContent]}
                multiline={true}
                placeholder={'취소 사유를 작성해주세요.'}
                placeholderTextColor="#949494"
                selectionColor={'#6C69FF'}
                onChangeText={(text) => {
                  setCancelContent(text);
                }}
                value={cancelContent}
              />
            </View>
            <View style={{flex: 1}} />
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity
          disabled={cancelContent === ''}
          onPress={() => {
            setCancelPointModal(true);
          }}
          style={{margin: 16}}
        >
          <View style={[styles.cancelPointBtn]}>
            <Text style={[DesignSystem.title2Regular, {color: 'white'}]}>적립 취소 신청</Text>
          </View>
        </TouchableOpacity>
        <CancelPointModal
          visible={cancelPointModal}
          closeCancelPointModal={() => setCancelPointModal(false)}
          missionId={route.params.missionId}
          reason={cancelContent}
          navigation={navigation}
        />
      </SafeAreaView>
    </>
  );
};

export default StoreMissionPayment;

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  screenHeaderWrap: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  screenStatusWrap: {flexDirection: 'row', flex: 1, backgroundColor: '#FFFFFF'},
  missionUserNumberWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 46,
    width: '100%',
    backgroundColor: '#FCFCFC',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  missionSeperate: {
    marginTop: 8,
  },
  missionStopText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Pretendard-SemiBold',
    color: '#C8C8C8',
  },

  missionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
  },
  cancelWrap: {justifyContent: 'center', alignItems: 'flex-start'},
  cancelTextWrap: {
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },
  missionMain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperateLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#DFDFDF',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
  },
  cancelBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  cancelContent: {
    width: '100%',
    height: 153,
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 11,
    paddingTop: 9,
    borderRadius: 10,
    marginBottom: 14,
    textAlignVertical: 'top',
  },
  cancelPointBtn: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C69FF',
    borderRadius: 10,
  },
});
