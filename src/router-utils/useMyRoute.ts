import { RouteProp, useRoute } from '@react-navigation/core';

import { RootStackParamList } from 'router';

export default function useMyRoute<RouteName extends keyof RootStackParamList>() {
    return useRoute<
        RouteProp<
            RootStackParamList,
            RouteName
        >
    >();
}
