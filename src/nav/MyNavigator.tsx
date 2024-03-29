import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from '../screens/My/MyPage';
import {MyNotificationsSetting} from '../screens/My/MyNotificationsSetting';
import {MyInquiry} from '../screens/My/MyInquiry';
import {MyEditUserInfo} from '../screens/My/MyEditUserInfo';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigator';

export type MyStackParamList = {
  MyPage: undefined;
  MyEditUserInfo: {username: string; auth: string};
  MyPoint: {point: number};
  MyReview: undefined;
  MyNotificationsSetting: undefined;
  MyInquiry: undefined;
  AuthNavigator: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

export const MyNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'MyEditUserInfo' ||
      routeName === 'MyReview' ||
      routeName === 'MyNotificationsSetting' ||
      routeName === 'MyInquiry' ||
      routeName === 'AuthNavigator'
    ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyEditUserInfo" component={MyEditUserInfo} />
      <Stack.Screen name="MyNotificationsSetting" component={MyNotificationsSetting} />
      <Stack.Screen name="MyInquiry" component={MyInquiry} />
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
