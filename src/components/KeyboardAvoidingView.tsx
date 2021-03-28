import React, { useMemo } from 'react';
import {
    KeyboardAvoidingView as RNKeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Keyboard,
} from 'react-native';

type KeyboardAvoidingViewProps = {
    children: React.ReactNode
}
const KeyboardAvoidingView = ({
    children,
}: KeyboardAvoidingViewProps) => {
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const style = useMemo(() => ({flex: 1}), []);
    return (
        <RNKeyboardAvoidingView
            behavior={behavior}
            style={style}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={Keyboard.dismiss}>
                <>
                    {children}
                </>
            </TouchableOpacity>
        </RNKeyboardAvoidingView>
    );
};

export default KeyboardAvoidingView;
