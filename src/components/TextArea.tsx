import styled, { tval } from 'themes';

import Input from './Input';

const TextArea = styled(Input).attrs({
    multiline: true,
    textAlignVertical: 'top',
})`
    margin-bottom: ${tval('gutter')};
`;

export default TextArea;
