import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ScreenContainer } from 'components';
import { RootState, writingsActions } from 'store';
import { useMyNavigation } from 'router-utils';

import WritingItem from './WritingItem';

const WritingListScreen = () => {
    const { navigate } = useMyNavigation<'WritingList'>();
    const dispatch = useDispatch();
    const list = useSelector((s: RootState) => s.writings.list);

    useEffect(() => {
        dispatch(writingsActions.requestGetWritings({
            pageSize: 100
        }));
    }, [dispatch]);

    return (
        <ScreenContainer>
            <FlatList
                data={list?.data}
                renderItem={WritingItem}
                keyExtractor={item => `${item.id}`}
                />

            <Button
                text='생성'
                onPress={() => navigate('WritingNew')}
                />
        </ScreenContainer>
    );
}

export default WritingListScreen;
