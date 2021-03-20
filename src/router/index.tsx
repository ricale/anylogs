import React from 'react';
import {
    NavigationContainer
} from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator
} from '@react-navigation/stack';

import * as pages from 'screens';

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
                <Stack.Screen name='WritingsList' component={pages.WritingsListScreen} />
                <Stack.Screen
                    name='WritingsNew'
                    component={pages.WritingsNewScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
                    }}
                    />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRouter;
