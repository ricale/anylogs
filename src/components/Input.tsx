import styled, { tval } from 'themes';

type InputProps = {
  marginBottom?: number | string
}
const Input = styled.TextInput.attrs({
  autoCorrect: false,
  autoCompleteType: 'off',
  autoCapitalize: 'none',
  placeholderTextColor: '#AAA',
})<InputProps>`
  height: ${tval('inputHeight')};
  margin-bottom: ${tval(p => p.marginBottom)};
  padding: ${tval('gutter')};

  font-size: ${p => p.theme.text.input.fontSize}px;
  color: ${tval('colorOnInputSurface')};
  background-color: ${tval('colorInputSurface')};
`;

export default Input;
