import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Button,
    Input,
    ScreenContainer,
} from 'components';
import { RootState, writingsActions } from 'store';
import styled, { tval } from 'themes';
import { useMyNavigation } from 'router-utils';

const Form = styled.View`
    margin: ${tval('margin')};
    padding: ${tval('margin')};
    background-color: ${tval('colorSurface')};
`;
const TextArea = styled(Input).attrs({
    multiline: true,
    textAlignVertical: 'top',
})`
    height: 200px;
    margin-bottom: ${tval('gutter')};
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

            <Form>
                <TextArea
                    value={content}
                    onChangeText={onChangeContent}
                    />

                <Button
                    text='저장'
                    loading={submitting}
                    onPress={onPress}
                    />
            </Form>
        </ScreenContainer>
    );
};

export default WritingNewScreen;
