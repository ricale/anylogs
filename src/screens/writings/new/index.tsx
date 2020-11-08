import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    Button,
    Input,
    ScreenContainer,
} from 'components';
import { writingsActions } from 'store';
import styled, { tval } from 'themes';

const Form = styled.View`
    margin: ${tval('margin')};
    padding: ${tval('margin')};
    background-color: ${tval('colorSurface')};
`;
const TextArea = styled(Input)`
    height: 200px;
    margin-bottom: ${tval('gutter')};
    text-align-vertical: top;
`;

const WritingsNewScreen = () => {
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const onPress = useCallback(() => {
        dispatch(writingsActions.requestCreateWriting({
            content,
        }));
    }, [dispatch, content]);
    return (
        <ScreenContainer
            contentAlignCenter
            popup>

            <Form>
                <TextArea
                    multiline
                    value={content}
                    onChangeText={setContent}
                    />

                <Button
                    text='저장'
                    onPress={onPress}
                    />
            </Form>
        </ScreenContainer>
    )
}

export default WritingsNewScreen;
