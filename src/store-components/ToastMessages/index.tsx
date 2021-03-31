import React, { useCallback, useEffect, useMemo, useState } from 'react';

import styled, { tval } from 'themes';
import { RootState, StatusState } from 'store';
import { useSelector } from 'react-redux';

import Message from './Message';

const MESSAGE_MAX_COUNT = 1;
const MESSAGE_DURATION = 2000;

const Container = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    padding: 0 ${tval('gutter')};
`;

type ToastMessage = (StatusState['message'] & {
    hide?: boolean
})

const ToastMessages = () => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);
    const newMessage = useSelector((s: RootState) =>
        s.status.message
    );

    const hideMessageWithAnimation = useCallback((timestamp: number) => {
        setMessages(msgs =>
            msgs.map(msg => {
                if(msg.timestamp !== timestamp) {
                    return msg;
                }
                return {
                    ...msg,
                    hide: true,
                };
            }),
        );
    }, []);

    const removeMessage = useCallback((timestamp: number) => {
        setMessages(msgs =>
            msgs.filter(msg =>
                msg.timestamp !== timestamp
            )
        );
    }, []);

    const initTimestamp = useMemo(() => new Date().getTime(), []);
    useEffect(() => {
        if(!newMessage || newMessage.timestamp < initTimestamp) {
            return;
        }

        setMessages(msgs => [...msgs, {...newMessage}]);

        setTimeout(() => {
            hideMessageWithAnimation(newMessage.timestamp);
        }, MESSAGE_DURATION);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessage]);

    useEffect(() => {
        const shownMessages = messages.filter(msg => !msg.hide);
        if(shownMessages.length > MESSAGE_MAX_COUNT) {
            removeMessage(shownMessages[0].timestamp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    // const onClick = useCallback((clickedMessage: ToastMessage) => {
    //     hideMessageWithAnimation(clickedMessage.timestamp);
    // }, []);

    if(!messages.length) {
        return null;
    }

    return (
        <Container>
            {messages.map(msg =>
                <Message
                    key={msg.timestamp}
                    type={msg.type === 'failure' ? 'danger' : msg.type}
                    content={msg.content}
                    hide={msg.hide}
                    timestamp={msg.timestamp}
                    onEndHideAnimation={removeMessage}
                    onPress={removeMessage}
                    />
            )}
        </Container>
    );
};

export default ToastMessages;
