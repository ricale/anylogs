import { ActivityIndicatorProps } from 'react-native';

import styled from 'themes';

const LoadingIndicator = styled.ActivityIndicator.attrs(p => ({
    size: p.size || 'large',
    color: p.color || p.theme.colors.colorPrimary,
}))<ActivityIndicatorProps>`
`;

export default LoadingIndicator;
