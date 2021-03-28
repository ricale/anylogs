import { DefaultTheme } from 'styled-components/native';

const base = 16;

const colors = {
    colorPrimary: 'gold',
    colorOnPrimary: 'black',

    colorBackground: '#333333',
    colorOnBackground: '#FFFFFF',

    colorSurface: '#333333',
    colorOnSurface: '#FFFFFF',

    colorDisabled: '#AAA',

    colorInputSurface: '#DDDDDD',
    colorOnInputSurface: '#121212',

    colorError: '#CF6679',
    colorOnError: '#000000',

    colorSuccess: '#BB86FC',
    colorOnSuccess: '#000000',
};

const dimens = {
    bigMargin: base * 2,
    margin: base * 1,
    gutter: base * 0.5,
    spacing: base * 0.25,

    headerHeight: base * 3,
    buttonHeight: base * 3,
    inputHeight: base * 3,
};

const text = {
    h1:      { fontSize: base * 3 },
    h2:      { fontSize: base * 2 },
    h3:      { fontSize: base * 1.5 },
    h4:      { fontSize: base * 1.25 },
    h5:      { fontSize: base * 1.125 },
    h6:      { fontSize: base * 1 },
    body1:   { fontSize: base * 1 },
    body2:   { fontSize: base * 0.875 },
    caption: { fontSize: base * 0.75 },
    input:   { fontSize: base * 1.0625 },
};

export interface NormalTheme extends DefaultTheme {
    colors: typeof colors
    dimens: typeof dimens
    text: typeof text
}
const normalTheme: NormalTheme = {
    colors,
    dimens,
    text,
};

export default normalTheme;