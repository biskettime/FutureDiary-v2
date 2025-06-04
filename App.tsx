/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {RootStackParamList, TabParamList} from './src/types';
import TimelineScreen from './src/screens/TimelineScreen';
import HomeScreen from './src/screens/HomeScreen';
import WriteEntryScreen from './src/screens/WriteEntryScreen';
import ViewEntryScreen from './src/screens/ViewEntryScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MyDiaryScreen from './src/screens/MyDiaryScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e9ecef',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#6c757d',
      }}>
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          tabBarLabel: '타임라인',
          tabBarIcon: ({color, size}) => (
            <Icon name="activity" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '일기쓰기',
          tabBarIcon: ({color, size}) => (
            <Icon name="edit-3" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={MyDiaryScreen}
        options={{
          tabBarLabel: '나의 일기장',
          tabBarIcon: ({color, size}) => (
            <Icon name="book-open" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: '일기 찾기',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
              borderBottomColor: '#e9ecef',
              borderBottomWidth: 1,
            },
            headerTintColor: '#343a40',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WriteEntry"
            component={WriteEntryScreen}
            options={{
              presentation: 'modal',
              headerTitle: '새 일기',
            }}
          />
          <Stack.Screen
            name="ViewEntry"
            component={ViewEntryScreen}
            options={{
              headerTitle: '일기 보기',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
