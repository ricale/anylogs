import styled, { tval } from 'themes';

type ContainerProps = {
  transparent?: boolean
}
const Container = styled.View<ContainerProps>`
  flex: 1;
  background-color: ${p => (
    p.transparent ?
      'rgba(0,0,0,0.6)' :
      tval('colorBackground')
  )};
`;

export default Container;
