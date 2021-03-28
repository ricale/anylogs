import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyledComponent } from 'styled-components';

import styled, { css } from 'themes';

type ContainerProps = {
    float: boolean
}
const Container = styled.View<ContainerProps>`
    ${p => p.float && css`
        position: absolute;
    `}
    flex-direction: column;

    width: 100%;
    height: ${p => p.theme.dimens.headerHeight}px;
    z-index: 10;
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
    float?: boolean
    left?: React.ReactNode
    right?: React.ReactNode
    children?: React.ReactNode
}
const ScreenContainerHeader = ({
    float = true,
    left,
    right,
    children,
}: ScreenContainerHeaderProps) => {
    const RowComp: StyledComponent<any, any, any> = useMemo(() => {
        return float ? RowWithGradient : Row;
    }, [float]);

    return (
        <Container float={float}>
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
