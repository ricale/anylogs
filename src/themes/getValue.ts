import { ThemeProps } from 'styled-components';

import { isBlank } from 'utils';

import normal, { NormalTheme } from './normal';

function withUnit(v: any) {
    if(typeof v === typeof 0) {
        return `${v}px`;
    }
    if(isBlank(v)) {
        return '0px';
    }

  return v;
}

function isString(arg: any): arg is string {
    return typeof arg === typeof 'string';
}
function isFunction(arg: any): arg is Function {
    return typeof arg === 'function';
}
function isDimens(arg: any): arg is keyof NormalTheme['dimens'] {
    return isString(arg) && Object.keys(normal.dimens).includes(arg);
}
function isColors(arg: any): arg is keyof NormalTheme['colors'] {
    return isString(arg) && Object.keys(normal.colors).includes(arg);
}

type Props = ThemeProps<NormalTheme>
type GetValueParam<P extends Props> = (
    ((p: P) => (string | number | null | undefined)) |
    string |
    number |
    null |
    undefined
)
// TODO:
//  - TabBar.tsx 의 분기 방식
//    `${p => p.focused ? p.theme.colors.colorPrimary : p.theme.colors.colorOnBackground};`
export default function getValue<P extends Props>(v: GetValueParam<P>) {
    return (p: P) => {
        const value = isFunction(v) ? v(p) : v;
        return withUnit(
            isDimens(value) ? p.theme.dimens[value] :
            isColors(value) ? p.theme.colors[value] :
                              value
        );
    };
}
