import React from 'react';

import { Text } from 'components';
import styled, { tval } from 'themes';
import { Writing } from 'store';
import { toDateString } from 'utils';

const Container = styled.View`
    padding: ${tval('gutter')};
`;
const At = styled(Text)`
    font-size: ${p => p.theme.text.caption.fontSize}px;
`;

type WritingItemProps = {
    item: Writing
}
const WritingItem = ({
    item,
}: WritingItemProps) => {
    return (
        <Container>
            <At>{toDateString(item.createdAt)}</At>
            <Text>{item.content}</Text>
        </Container>
    );
}

export default WritingItem;
