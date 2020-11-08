import * as styledComponents from 'styled-components/native';
import { ThemeContext, ReactNativeThemedStyledComponentsModule } from 'styled-components/native';
import { useContext } from 'react';

import normal, { NormalTheme } from './normal';
import getValue from './getValue';

const {
    default: styled,
    css,
    ThemeProvider,
} = styledComponents as ReactNativeThemedStyledComponentsModule<NormalTheme>;

export function useTheme() {
    return useContext(ThemeContext)
}

export {
    css,
    ThemeProvider,
    normal,
    getValue,
    getValue as tval,
};

export default styled;