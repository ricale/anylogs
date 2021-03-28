import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import styled, { tval } from 'themes';
import { Text } from 'components';
import { capitalize } from 'utils';

// FIXME: 상수들을 ./index.tsx 에 같이 모아두자
const ANIMATION_DURATION = 200;

type ContentProps = {
    type: string
}
const Content = styled(Text)<ContentProps>`
    width: 100%;
    padding: ${tval('spacing')} ${tval('gutter')};
    margin-top: ${tval('gutter')};
    
    background-color: ${tval(p => `color${capitalize(p.type)}`)};
    color: ${tval(p => `colorOn${capitalize(p.type)}`)};
    text-align: center;
`;


type MessageProps = {
    type: 'error' | 'success'
    hide?: boolean
    content: string
    timestamp: number
    onEndHideAnimation: (timestamp: number) => void
}
const Message = ({
    type,
    hide,
    content,
    timestamp,
    onEndHideAnimation
}: MessageProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: hide ? 0 : 1,
            duration: ANIMATION_DURATION - 1,
            useNativeDriver: true,
        }).start(() => {
            if(hide) {
                onEndHideAnimation(timestamp);
            }
        });
    }, [hide, fadeAnim]);

    return (
        <Animated.View
            style={{ opacity: fadeAnim }}>
            <Content
                type={type}>
                {content}
            </Content>
        </Animated.View>
    )
};

export default Message;
