import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native';

import {
    Button,
    TextArea,
    ScreenContainer,
} from 'components';
import { RootState, writingsActions } from 'store';
import { useMyNavigation } from 'router-utils';
import styled from 'themes';

const ContentArea = styled(TextArea)`
    flex: 1;
`;

type WritingNewState = {
    content: string
    submitting: boolean
}

const WritingNewScreen = () => {
    const dispatch = useDispatch();
    const navigation = useMyNavigation();
    const { created } = useSelector((s: RootState) => s.writings);
    const [{
        content,
        submitting,
    }, setState] = useState<WritingNewState>({
        content: '',
        submitting: false,
    });

    const textareaRef = useRef<TextInput>(null);
    useEffect(() => {
        if(textareaRef) {
            setTimeout(() => textareaRef.current?.focus(), 0);
        }
    }, [textareaRef]);

    const initTimestamp = useMemo(() => new Date().getTime(), []);
    useEffect(() => {
        if(!created || created.timestamp < initTimestamp) {
            return;
        }

        if(created.success) {
            navigation.navigate('WritingList');
        } else {
            setState(st => ({ ...st, submitting: false }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [created, navigation]);

    const onChangeContent = useCallback((text: string) => {
        setState(st => ({ ...st, content: text }));
    }, []);

    const onPress = useCallback(() => {
        setState(st => ({ ...st, submitting: true }));
        dispatch(writingsActions.requestCreateWriting({
            content: content,
        }));
    }, [dispatch, content]);

    return (
        <ScreenContainer
            contentAlignCenter
            popup>

            <ContentArea
                ref={textareaRef}
                value={content}
                onChangeText={onChangeContent}
                />

            <Button
                text='저장'
                loading={submitting}
                onPress={onPress}
                />
        </ScreenContainer>
    );
};

export default WritingNewScreen;
