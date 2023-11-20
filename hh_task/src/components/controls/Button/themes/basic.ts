import { extractCSSOption, OptionizedCSS, scale } from '@greensight/gds';
import { ButtonTheme } from '@greensight/gds/types/src/components/FutureButton';
import { colors, MEDIA_QUERIES, typography, TypographyParam } from '@scripts/gds';
import { Variants, Sizes } from '../enums';

export const basicButtonTheme: ButtonTheme<typeof Variants, typeof Sizes, TypographyParam> = {
    button: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                padding: `${scale(1)}px ${scale(4)}px`,
                borderRadius: scale(1, true),
                height: `${scale(5) + 4}px`,
                ...(typography('xs') as any),
            },
            sm: {
                padding: `${scale(1)}px ${scale(4)}px`,
                borderRadius: scale(1, true),
                height: `${scale(11, true)}px + 4`,
                ...(typography('xs') as any),
            },
        };
        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
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
            secondary: {
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
            link: {
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
            nonactive: {
                ackgroundColor: colors.grey200,
                color: colors.grey800,
                size: 44,
                ':hover': {
                    backgroundColor: colors.blueHover,
                },
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },
    icon: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                width: scale(2),
                height: scale(2),
                ...typography('xs'),
            },
            sm: {
                width: scale(2),
                height: scale(2),
                ...typography('xs'),
            },
        };
        const variant: OptionizedCSS<typeof Variants> = {
            primary: {
                display: 'none',
            },
            secondary: {
                display: 'none',
            },
            link: {
                ...(state.rounded && {
                    color: colors.blue,
                }),
            },
            nonactive: {
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
