import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';

import { Button, ScreenContainer, Text, TextArea } from 'components';
import { RootState, writingsActions } from 'store';
import { useParams } from 'router-utils';
import { toDateString } from 'utils';
import styled, { tval } from 'themes';

const HeaderRight = styled.View`
    flex-direction: row;
`;
const Info = styled.View`
    margin-top: ${tval('gutter')}; 
    padding: 0 ${tval('gutter')};
`;
const At = styled(Text)`
    font-size: ${p => p.theme.text.caption.fontSize}px;
    text-align: right;
`;
const ContentArea = styled(TextArea)`
    flex: 1;
`;

type WritingDetailState = {
    content: string
    editing: boolean
    submitting: boolean
}

const WritingDetailScreen = () => {
    const { id } = useParams<'WritingDetail'>();
    const dispatch = useDispatch();
    const detail = useSelector((s: RootState) => s.writings.detail);
    const [{
        content,
        editing,
        // submitting,
    }, setState] = useState<WritingDetailState>({
        content: detail?.content || '',
        editing: false,
        submitting: true,
    });

    useEffect(() => {
        dispatch(writingsActions.requestGetWriting(id));
    }, [dispatch, id]);

    const keyboardDidShow = () => setState(st => ({ ...st, editing: true }));
    const keyboardDidHide = () => setState(st => ({ ...st, editing: false }));
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
        };
    }, []);

    useEffect(() => {
        if(detail?.id === id) {
            setState(st => ({
                ...st,
                content: detail?.content,
                submitting: false,
            }));
        }
    }, [detail, id]);

    const onChangeContent = useCallback((text: string) => {
        setState(st => ({ ...st, content: text }));
    }, []);

    return (
        <ScreenContainer
            popup
            headerRight={
                <HeaderRight>
                    <Button
                        icon='delete'
                        iconSize={20}
                        iconColor='danger'
                        transparent
                        />
                    <Button
                        icon='save'
                        iconSize={20}
                        transparent
                        />
                </HeaderRight>
            }
            headerShown>

            {!editing &&
                <Info>
                    <At>{toDateString(detail?.createdAt)}</At>
                </Info>
            }
            <ContentArea
                value={content}
                onChangeText={onChangeContent}
                />
        </ScreenContainer>
    );
};

export default WritingDetailScreen;
