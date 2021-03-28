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

const WritingNewScreen = () => {
    const dispatch = useDispatch();
    const navigation = useMyNavigation();
    const [content, setContent] = useState('');
    const { created } = useSelector((s: RootState) => s.writings);

    const initTimestamp = useMemo(() => new Date().getTime(), []);
    useEffect(() => {
        if(!created || created.timestamp < initTimestamp) {
            return;
        }
        if(created.success) {
            // 성공 메시지
            navigation.navigate('WritingList');
        } else {
            // 실패 메시지
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [created, navigation]);

    const onPress = useCallback(() => {
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
                    onChangeText={setContent}
                    />

                <Button
                    text='저장'
                    onPress={onPress}
                    />
            </Form>
        </ScreenContainer>
    );
};

export default WritingNewScreen;
