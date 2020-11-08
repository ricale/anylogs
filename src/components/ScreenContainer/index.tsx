import React from 'react';

import styled from 'themes';

import Button from '../Button';
import Text from '../Text';
import KeyboardAvoidingView from '../KeyboardAvoidingView';

import Container from './Container';
import Header from './Header';
import Content from './Content';

const Title = styled(Text)`
  font-size: ${p => p.theme.text.h4.fontSize}px;
  color: ${p => p.theme.colors.colorOnBackground};
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
    headerFloat,
    headerLeft,
    headerRight,
    contentAlignCenter,
    contentPaddingHorizontal,
    ...props
}: ScreenContainerProps) => {
    return (
        <Container
            style={containerStyle}
            transparent={popup}>
            {headerShown &&
                <Header
                    left={
                        headerLeft !== undefined ? headerLeft :
                            <Button>a</Button>
                    }
                    right={headerRight}
                    float={headerFloat}>
                    {!!title &&
                        <Title>{title}</Title>
                    }
                </Header>
            }

            {keyboardAvoiding &&
                <KeyboardAvoidingView>
                    <Content
                        {...props}
                        alignCenter={contentAlignCenter}
                        paddingHorizontal={contentPaddingHorizontal}
                        />
                </KeyboardAvoidingView>
            }
            {!keyboardAvoiding &&
                <Content
                    {...props}
                        alignCenter={contentAlignCenter}
                        paddingHorizontal={contentPaddingHorizontal}
                    />
            }
        </Container>
    )
}

export default ScreenContainer;
