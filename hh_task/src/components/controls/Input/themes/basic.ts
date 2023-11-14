import { extractCSSOption, OptionizedCSS, scale } from '@greensight/gds';
import { colors, typography } from '@scripts/gds';
import { Variants, Sizes } from '../enums';
import { InputTheme } from '../types';

export const basicInputTheme: InputTheme<typeof Variants, typeof Sizes> = {
    input: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            sm: {
                width: '100%',
                ...(typography('s') as any),
            },
            md: {
                ...(typography('s') as any),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                borderColor: `${scale(1, true) - 3}px solid ${colors.grey400}`,
                backgroundColor: colors.white,
                color: colors.grey600,
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },

    inputBlock: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            sm: {
                width: '100%',
                ...(typography('s') as any),
            },
            md: {
                ...(typography('s') as any),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {},
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },

    label: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            sm: {},
            md: {},
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {},
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },

    error: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            sm: {},
            md: {},
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {},
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },
};

export const INPUT_THEMES = {
    basic: basicInputTheme,
};
