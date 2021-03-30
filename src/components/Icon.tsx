import React from 'react';
import ReactNativeVectorIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'themes';
import { capitalize } from 'utils';

type IconProps = {
    name: string
    size?: number
    color?: string
}
const Icon = ({
    size = 30,
    color: _color = 'onBackground',
    ...props
}: IconProps) => {
    const theme = useTheme();
    const colorName = `color${capitalize(_color)}`;
    const color = theme.colors[colorName as keyof typeof theme.colors] || _color;

    return (
        <ReactNativeVectorIcon
            size={size}
            color={color}
            {...props}
            />
    )
}

export default Icon;
