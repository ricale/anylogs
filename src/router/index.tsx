import React from 'react';
import { Animated } from 'react-native';
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

const forSlide: StackCardStyleInterpolator = ({current, inverted, layouts: {screen}}) => {
    return {
        cardStyle: {
            opacity: current.progress,
            transform: [
                {
                    translateY: Animated.multiply(
                        current.progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [screen.height, 0, screen.height * -1],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    };
};

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
                        cardStyleInterpolator: forSlide,
                    }}
                    />
                <Stack.Screen
                    name='WritingDetail'
                    component={pages.WritingDetailScreen}
                    options={{
                        cardStyleInterpolator: forSlide,
                    }}
                    />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
