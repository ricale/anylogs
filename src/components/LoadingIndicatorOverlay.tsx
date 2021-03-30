import React from 'react';

import styled from 'themes';

import LoadingIndicator from './LoadingIndicator';

const Container = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

type LoadingIndicatorOverlayProps = {
    visible?: boolean
    // transparent?: boolean
    // full?: boolean
    indicatorSize?: 'small' | 'large'
    color?: string
}
const LoadingIndicatorOverlay = ({
    visible = true,
    // transparent = true,
    // full,
    indicatorSize = 'large',
    color,
}: LoadingIndicatorOverlayProps) => {
    if(!visible) {
        return null;
    }

    return (
        <Container>
            <LoadingIndicator
                size={indicatorSize}
                color={color}
                />
        </Container>
    )
}

export default LoadingIndicatorOverlay;
