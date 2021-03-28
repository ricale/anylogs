import React from 'react';
import {
    NavigationContainer,
    ParamListBase,
} from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';

import * as pages from 'screens';

export interface RootStackParamList extends ParamListBase {
    WritingList: undefined
    WritingNew: undefined
}

const Stack = createStackNavigator<RootStackParamList>();
const AppRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name='WritingList' component={pages.WritingListScreen} />
                <Stack.Screen
                    name='WritingNew'
                    component={pages.WritingNewScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
                    }}
                    />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
