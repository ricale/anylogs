import React from 'react';

import styled, { tval } from 'themes';

import Text from '../Text';
import KeyboardAvoidingView from '../KeyboardAvoidingView';

import Container from './Container';
import Header from './Header';
import Content from './Content';

const Title = styled(Text)`
  font-size: ${p => p.theme.text.h4.fontSize}px;
  color: ${p => p.theme.colors.colorOnBackground};
  padding: 0 ${tval('margin')};
`;

type ScreenContainerProps = {
    children?: React.ReactNode
    refreshControl?: React.ReactNode

    scroll?: boolean
    keyboardAvoiding?: boolean
    containerStyle?: {[key: string]: any}
    popup?: boolean

    headerShown?: boolean
    title?: string
    headerFloat?: boolean
    headerLeft?: React.ReactNode
    headerRight?: React.ReactNode
    
    contentAlignCenter?: boolean
    contentPaddingHorizontal?: number | string
}
const ScreenContainer = ({
    keyboardAvoiding,
    containerStyle,
    popup,

    headerShown,
    title,
    headerFloat: _headerFloat,
    headerLeft,
    headerRight,
    contentAlignCenter,
    contentPaddingHorizontal,
    ...props
}: ScreenContainerProps) => {
    const transparent = popup;
    const headerFloat = !!_headerFloat && !popup;
    return (
        <Container
            style={containerStyle}
            transparent={transparent}>
            {headerShown &&
                <Header
                    left={headerLeft}
                    right={headerRight}
                    float={headerFloat}
                    transparent={!transparent}>
                    {typeof title === 'string' ?
                        <Title>{title}</Title> :
                        (!!title && title)
                    }
                </Header>
            }

            {keyboardAvoiding &&
                <KeyboardAvoidingView>
                    <Content
                        {...props}
                        alignCenter={contentAlignCenter}
                        paddingHorizontal={contentPaddingHorizontal}
                        transparent={!transparent}
                        />
                </KeyboardAvoidingView>
            }
            {!keyboardAvoiding &&
                <Content
                    {...props}
                    alignCenter={contentAlignCenter}
                    paddingHorizontal={contentPaddingHorizontal}
                    transparent={!transparent}
                    />
            }
        </Container>
    );
};

export default ScreenContainer;
