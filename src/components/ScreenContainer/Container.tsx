import styled, { css, tval } from 'themes';

type ContainerProps = {
    transparent?: boolean
}
const Container = styled.View<ContainerProps>`
    flex: 1;
    background-color: ${tval('colorBackground')};

    ${p => p.transparent && css`
        padding-top: ${tval('gutter')};
        padding-left: ${tval('gutter')};
        padding-right: ${tval('gutter')};
        background-color: rgba(0,0,0,0.6);
    `};
`;

export default Container;
