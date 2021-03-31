import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyledComponent } from 'styled-components';

import styled, { css, tval } from 'themes';

type ContainerProps = {
    float: boolean
    transparent: boolean
}
const Container = styled.View<ContainerProps>`
    ${p => p.float && css`
        position: absolute;
    `}
    flex-direction: column;

    width: 100%;
    height: ${p => p.theme.dimens.headerHeight}px;
    z-index: 10;

    ${p => !p.transparent && css`
        background-color: ${tval('colorBackground')};
        border-bottom-width: 1px;
        border-color: #000;
    `}
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`;

const RowWithGradient = styled(LinearGradient).attrs({
    colors: ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.1)'],
})`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;


const LeftContainer = styled.View`
`;
const ChildrenContainer = styled.View`
    flex: 1;
`;
const RightContainer = styled.View`
`;

type ScreenContainerHeaderProps = {
    float: boolean
    transparent?: boolean
    left?: React.ReactNode
    right?: React.ReactNode
    children?: React.ReactNode
}
const ScreenContainerHeader = ({
    float,
    transparent = true,
    left,
    right,
    children,
}: ScreenContainerHeaderProps) => {
    const RowComp: StyledComponent<any, any, any> = useMemo(() => {
        return float ? RowWithGradient : Row;
    }, [float]);

    return (
        <Container
            float={float}
            transparent={transparent}>
            <RowComp>
                <LeftContainer>
                    {left}
                </LeftContainer>
                <ChildrenContainer>
                    {children}
                </ChildrenContainer>
                <RightContainer>
                    {right}
                </RightContainer>
            </RowComp>
        </Container>
    );
};

export default ScreenContainerHeader;
