import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ScreenContainer } from 'components';
import { RootState, writingsActions } from 'store';
import { useMyNavigation } from 'router-utils';
import styled, { tval } from 'themes';

import WritingItem from './WritingItem';

const Actions = styled.View`
    position: absolute;
    right: ${tval('margin')};
    bottom: ${tval('margin')};
`;

const WritingListScreen = () => {
    const { navigate } = useMyNavigation<'WritingList'>();
    const dispatch = useDispatch();
    const list = useSelector((s: RootState) => s.writings.list);

    useEffect(() => {
        dispatch(writingsActions.requestGetWritings({
            pageSize: 100,
        }));
    }, [dispatch]);

    const onPressNew = useCallback(() => {
        navigate('WritingNew')
    }, []);

    return (
        <ScreenContainer>
            <FlatList
                data={list?.data}
                renderItem={({ item }) =>
                    <WritingItem
                        item={item}
                        onPress={() => { navigate('WritingDetail'); }}
                        />
                }
                keyExtractor={item => `${item.id}`}
                />

            <Actions>
                <Button
                    text='생성'
                    onPress={onPressNew}
                    />
            </Actions>
        </ScreenContainer>
    );
};

export default WritingListScreen;
