import { CSSObject } from '@emotion/core';
import {
    ComponentsTheme,
    Theme,
    createMediaQueries,
    createTheme,
    typography as gdsTypography,
    useTheme as useGDSTheme,
} from '@greensight/gds';

import tokens from '../../../public/tokens.json';
import { global } from '../themes/global';

export const { colors, shadows } = tokens;
export type ColorsTheme = typeof colors;
export type TypographyParam = keyof typeof tokens.typography.styles;

export const MEDIA_QUERIES = createMediaQueries(tokens.layout.breakpoints);

export interface ExtendedTheme extends Omit<Theme, 'colors'> {
    components?: ComponentsTheme;
    colors?: ColorsTheme;
}

const settings: ExtendedTheme = {
    global,
};

const theme = createTheme({
    tokens,
    settings,
}) as ExtendedTheme;

const typography = (name: TypographyParam = 'h1') => gdsTypography(name, theme) as CSSObject;
const useTheme = () => useGDSTheme() as ExtendedTheme;

export * from '@greensight/gds';
export { typography, theme, useTheme };
