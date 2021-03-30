import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator,
    StackCardStyleInterpolator,
} from '@react-navigation/stack';

import * as pages from 'screens';

export type RootStackParamList = {
    WritingList: undefined
    WritingNew: undefined
    WritingDetail: {
        id: string
    }
}

const forFade: StackCardStyleInterpolator = ({current}) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

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
                        cardStyleInterpolator: forFade,
                    }}
                    />
                <Stack.Screen
                    name='WritingDetail'
                    component={pages.WritingDetailScreen}
                    options={{
                        cardStyleInterpolator: forFade,
                    }}
                    />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
