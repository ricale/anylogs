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
    transparent?: boolean
}
const Container = styled.View<ContainerProps>`
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

    ${p => !p.transparent && css`
        background-color: ${tval('colorBackground')};
    `}
`;

type ScreenContainerContentProps = {
    scroll?: boolean
    children?: React.ReactNode
    refreshControl?: React.ReactNode
    alignCenter?: boolean
    paddingHorizontal?: number | string
    transparent?: boolean
}
const ScreenContainerContent = ({
    scroll,
    children,
    paddingHorizontal,
    transparent = true,
    ...props
}: ScreenContainerContentProps) => {
    const Comp = scroll ? ScrollView : View;

    return (
        <Container
            as={Comp}
            full={!scroll}
            alwaysBounceVertical={false}
            paddingHorizont={paddingHorizontal}
            transparent={transparent}
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