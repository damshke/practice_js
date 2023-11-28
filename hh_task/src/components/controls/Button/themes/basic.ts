import { extractCSSOption, OptionizedCSS, scale } from '@greensight/gds';
import { ButtonTheme } from '@greensight/gds/types/src/components/FutureButton';
import { colors, MEDIA_QUERIES, typography, TypographyParam } from '@scripts/gds';
import { Variants, Sizes } from '../enums';

export const basicButtonTheme: ButtonTheme<typeof Variants, typeof Sizes, TypographyParam> = {
    button: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            MD: {
                padding: `${scale(1)}px ${scale(4)}px`,
                borderRadius: scale(1, true),
                height: `${scale(5) + 4}px`,
                ...typography('xs'),
            },
            SM: {
                padding: `${scale(1)}px ${scale(4)}px`,
                borderRadius: scale(1, true),
                height: `${scale(10, true) + 4}px`,
                ...typography('xs'),
            },
        };
        const varianted: OptionizedCSS<typeof Variants> = {
            PRIMARY: {
                backgroundColor: colors.blue,
                color: colors.white,
                border: `0`,
                ':hover': {
                    backgroundColor: colors.blueHover,
                    cursor: 'pointer',
                },
                ...(state.disabled && {
                    backgroundColor: colors.grey200,
                    color: colors.grey800,
                }),
            },
            SECONDARY: {
                backgroundColor: colors.grey900,
                color: colors.white,
                border: `0`,
                ':hover': {
                    backgroundColor: colors.black,
                    cursor: 'pointer',
                },
                ...(state.disabled && {
                    backgroundColor: colors.grey200,
                    color: colors.grey800,
                }),
            },
            LINK: {
                backgroundColor: 'transparent',
                border: 0,
                color: colors.blue,
                width: '20%',
                textAlign: 'center',
                margin: 'auto',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                gap: scale(1, true),
                [MEDIA_QUERIES.md]: {
                    width: '100%',
                },
                ...(state.hidden && {
                    display: 'none',
                }),
                ...(state.block && {
                    position: 'absolute',
                    left: '0',
                    top: scale(8),
                    width: '100%',
                    justifyContent: 'start',
                    columnGap: scale(1),
                    [MEDIA_QUERIES.sm]: {
                        top: scale(17),
                        right: 0,
                        padding: 0,
                    },
                }),
                ':hover': { cursor: 'pointer' },
            },
            NONACTIVE: {
                backgroundColor: colors.grey200,
                color: colors.grey800,
                border: 0,
                size: 44,
                ':hover': { backgroundColor: colors.grey200 },
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },
    icon: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            MD: {
                width: scale(2),
                height: scale(2),
                alignItems: 'center',
                ...typography('xs'),
            },
            SM: {
                width: scale(2),
                height: scale(2),
                alignItems: 'center',
                ...typography('xs'),
            },
        };
        const variant: OptionizedCSS<typeof Variants> = {
            PRIMARY: {
                display: 'none',
            },
            SECONDARY: {
                display: 'none',
            },
            LINK: {
                ...(state.rounded && {
                    color: colors.blue,
                }),
            },
            NONACTIVE: {
                display: 'none',
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(variant, state.variant),
        };
    },
};

export const BUTTON_THEMES = {
    basic: basicButtonTheme,
};
