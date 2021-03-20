import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../';

// useNavigation 과의 구별을 위한 네이밍
function useMyNavigation<RouteName extends keyof RootStackParamList>() {
    const navigation = useNavigation<
        StackNavigationProp<
            RootStackParamList,
            RouteName
        >
    >();

    return useMemo(() => ({
        ...navigation,
        goBackOrHome: () => {
            if(navigation.canGoBack()) {
                navigation.pop();
            } else {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Home' },
                    ],
                });
            }
        },
        resetToFirst: () => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        },
    }), [navigation]);
}

export default useMyNavigation;
