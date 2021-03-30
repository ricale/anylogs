import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ScreenContainer, Text } from 'components'
import { RootState, writingsActions } from 'store';
import { useParams } from 'router-utils';
import { toDateString } from 'utils';
import styled, { tval } from 'themes';

const Content = styled.View`
    position: absolute;
    top: ${tval('margin')};
    left: ${tval('margin')};
    right: ${tval('margin')};
    bottom: ${tval('margin')};
    padding: ${tval('margin')};
    background-color: ${tval('colorSurface')};
`;

const WritingDetailScreen = () => {
    const { id } = useParams<'WritingDetail'>();
    const dispatch = useDispatch();
    const detail = useSelector((s: RootState) => s.writings.detail);

    useEffect(() => {
        dispatch(writingsActions.requestGetWriting(id));
    }, [dispatch]);

    return (
        <ScreenContainer popup>
            <Content>
                <Text>{toDateString(detail?.createdAt)}</Text>
                <Text>{detail?.content}</Text>
            </Content>
        </ScreenContainer>
    )
}

export default WritingDetailScreen;
