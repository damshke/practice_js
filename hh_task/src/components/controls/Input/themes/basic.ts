import { extractCSSOption, OptionizedCSS, scale } from '@greensight/gds';
import { colors, typography } from '@scripts/gds';
import { Variants, Sizes } from '../enums';
import { InputTheme } from '../types';

export const basicInputTheme: InputTheme<typeof Variants, typeof Sizes> = {
    input: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            sm: {
                width: '100%',
                ...typography('s'),
            },
            md: {
                ...typography('s'),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                borderRadius: scale(1, true),
                border: `${scale(1, true) - 3}px solid ${colors.grey400}`,
                background: colors.white,
                color: colors.black,
                height: `${scale(10, true) + 6}px`,
                padding: `${scale(1, true)}px ${scale(3, true)}px`,
                ...(state.textArea && {
                    minHeight: `${scale(9) + 2}px`,
                    padding: `${scale(3, true)}px`,
                }),
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
                display: 'flex',
                flexDirection: 'column',
                gap: scale(1, true),
                width: '100%',
            },
            md: {
                display: 'flex',
                flexDirection: 'column',
                gap: scale(1, true),
                width: '100%',
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
        };
    },

    label: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            sm: { ...typography('xsMedium') },
            md: { ...typography('xsMedium') },
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
            sm: {
                ...typography('s'),
            },
            md: {
                ...typography('s'),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                color: 'red',
            },
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
