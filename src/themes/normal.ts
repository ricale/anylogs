import { DefaultTheme } from 'styled-components/native';

const base = 16;

export interface NormalTheme extends DefaultTheme {
  colors: { [key: string]: string }
  dimens: {
    bigMargin: number
    margin: number
    gutter: number
    spacing: number
    headerHeight: number
    buttonHeight: number
    inputHeight: number
  }
  text: {
    h1: { [key: string]: any }
    h2: { [key: string]: any }
    h3: { [key: string]: any }
    h4: { [key: string]: any }
    h5: { [key: string]: any }
    h6: { [key: string]: any }
    body1: { [key: string]: any }
    body2: { [key: string]: any }
    caption: { [key: string]: any }
    input: { [key: string]: any }
  }
}
const normalTheme: NormalTheme = {
  colors: {
    colorPrimary: 'gold',
    colorOnPrimary: 'black',

    colorBackground: '#333333',
    colorOnBackground: '#FFFFFF',

    colorSurface: '#333333',
    colorOnSurface: '#FFFFFF',

    colorDisabled: '#AAA',

    colorInputSurface: '#DDDDDD',
    colorOnInputSurface: '#121212',
  },
  dimens: {
    bigMargin: base * 2,
    margin: base * 1,
    gutter: base * 0.5,
    spacing: base * 0.25,

    headerHeight: base * 3,
    buttonHeight: base * 3,
    inputHeight: base * 3,
  },

  text: {
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
  },
};

export default normalTheme;