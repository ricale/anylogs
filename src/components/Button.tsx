import React from 'react';

import styled, { css, tval } from 'themes';
import { capitalize } from 'utils';

import Text from './Text';

type ContainerProps = {
    transparent?: boolean
    width?: number
    block?: boolean
    compact?: boolean
    marginBottom?: number|string
    color?: string
}

const Container = styled.TouchableOpacity<ContainerProps>`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: ${tval('buttonHeight')};

    ${p => !!p.marginBottom && css`
        margin-bottom: ${tval(p.marginBottom)};
    `}
    padding: 0 ${tval('gutter')};
    ${p => p.compact && css`
        padding: 0;
    `}

    ${p => p.width && css`
        width: ${p.width}px;
    `}

    ${p => p.block && css`
        width: 100%;
    `}

    ${p => !p.transparent && css`
        background-color: ${
            p.theme.colors[
                `color${capitalize(p.color || 'primary')}` as keyof typeof p.theme.colors
            ] || p.color
        };
    `}
    ${p => (!p.transparent && p.disabled) && css`
        background-color: ${tval('colorDisabled')};
    `}
`;

const Label = styled(Text)`
    text-align: center;
`;

type ButtonProps = {
    text?: string
    textColor?: string
    textStyle?: object
    // icon?: string
    // iconColor?: string
    // iconSize?: number
    transparent?: boolean
    color?: string
    width?: number
    block?: boolean
    compact?: boolean
    marginBottom?: number | string
    disabled?: boolean
    onPress?: () => any
    children?: React.ReactNode
}
const Button = ({
    text,
    textColor,
    textStyle = {},
    // icon,
    // iconColor,
    // iconSize,
    transparent = false,
    color,
    disabled = false,
    children,
    ...props
}: ButtonProps) => {
    const colorName = (
        color ? capitalize(color) :
        !transparent ? 'Primary' :
                      undefined
    );

    // const iconColorName = (
    //   iconColor ? iconColor :
    //   !colorName ? undefined :
    //   transparent ? colorName :
    //                 `on${colorName}`
    // );
    const textColorName = (
        textColor ? textColor :
        !colorName ? undefined :
        transparent ? colorName :
                      `on${colorName}`
    );

    return (
      <Container
          transparent={transparent}
          disabled={disabled}
          color={color}
          {...props}>
          {/* 
          {!!icon &&
            <Icon
              name={icon}
              size={iconSize}
              color={iconColorName}
              />
          }
          */}
          {!children && text &&
              <Label
                  color={textColorName}
                  style={textStyle}>
                  {/* {icon ? ' ' : ''} */}
                  {text}
              </Label>
          }
          {!!children && children}
      </Container>
    );
};

export default Button;