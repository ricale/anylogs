import { RootStackParamList } from 'router';

import useMyRoute from './useMyRoute';

export default function useParams<RouteName extends keyof RootStackParamList>() {
    const route = useMyRoute<RouteName>();
    return (route.params || {}) as RootStackParamList[RouteName];
}
