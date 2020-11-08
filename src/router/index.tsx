import React from 'react';
import {
    NavigationContainer
} from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator
} from '@react-navigation/stack';

import {
    WritingsListScreen,
    WritingsNewScreen,
} from 'screens';

export type RootStackParamList = {
    WritingsList: undefined
    WritingsNew: undefined
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
                <Stack.Screen name='WritingsList' component={WritingsListScreen} />
                <Stack.Screen
                    name='WritingsNew'
                    component={WritingsNewScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
                    }}
                    />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRouter;
export * from './utils';
