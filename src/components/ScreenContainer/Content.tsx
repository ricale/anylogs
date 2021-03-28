import React from 'react';
import {
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import styled, {css, tval} from 'themes';

type ContainerProps = {
    full: boolean
    alignCenter?: boolean
    paddingHorizont?: number | string // 이름을 `paddingHorizontal`로 하면 에러 발생
    alwaysBounceVertical?: boolean
}
const Container = styled.View<ContainerProps>`
    background-color: transparent;
    ${p => p.full && css`
        flex: 1;
    `}

    ${p => p.alignCenter && css`
        justify-content: center;
    `}

    ${p => !!p.paddingHorizont && css`
        padding-left: ${tval(p.paddingHorizont)};
        padding-right: ${tval(p.paddingHorizont)};
    `}
`;

type ScreenContainerContentProps = {
    scroll?: boolean
    children?: React.ReactNode
    refreshControl?: React.ReactNode
    alignCenter?: boolean
    paddingHorizontal?: number | string
}
const ScreenContainerContent = ({
    scroll,
    children,
    paddingHorizontal,
    ...props
}: ScreenContainerContentProps) => {
    const Comp = scroll ? ScrollView : View;

    return (
        <Container
            as={Comp}
            full={!scroll}
            alwaysBounceVertical={false}
            paddingHorizont={paddingHorizontal}

            {...props}>
            <StatusBar
                translucent={false}
                barStyle='light-content'
                backgroundColor='#000000'
                />
            {children}
        </Container>
    );
};

export default ScreenContainerContent;