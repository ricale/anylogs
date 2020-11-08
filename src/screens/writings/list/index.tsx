import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ScreenContainer, Text } from 'components';
import { RootState, writingsActions } from 'store';
import { useMyNavigation } from 'router';

const WritingsListScreen = () => {
    const { navigate } = useMyNavigation<'WritingsList'>();
    const dispatch = useDispatch();
    const list = useSelector((s: RootState) => s.writings.list);

    useEffect(() => {
        dispatch(writingsActions.requestGetWritings());
    }, []);

    console.log('list', list);

    return (
        <ScreenContainer>
            <Text>WritingsListScreen</Text>

            {list?.data?.map(writing =>
                <View key={writing.id}>
                    <Text>{writing.content}</Text>
                </View>
            )}

            <Button
                text='생성'
                onPress={() => navigate('WritingsNew')}
                />
        </ScreenContainer>
    );
}

export default WritingsListScreen;
