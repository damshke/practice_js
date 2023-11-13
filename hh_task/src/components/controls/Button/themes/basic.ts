import { extractCSSOption, OptionizedCSS, scale } from '@greensight/gds';
import { ButtonTheme } from '@greensight/gds/types/src/components/FutureButton';
import { colors, MEDIA_QUERIES, typography, TypographyParam } from '@scripts/gds';
import { Variants, Sizes } from '../enums';

export const basicButtonTheme: ButtonTheme<typeof Variants, typeof Sizes, TypographyParam> = {
    button: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            xs: {
                padding: `${scale(1, true) + 0.5}px ${scale(1)}px`,
                ...(typography('xs') as any),
            },
        };
        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                backgroundColor: colors.blue,
                color: colors.white,
                ':hover': {
                    backgroundColor: colors.blueHover,
                },
                ...(state.disabled && {
                    backgroundColor: colors.grey200,
                    color: colors.grey800,
                }),
            },
            secondary: {
                backgroundColor: colors.grey900,
                color: colors.white,
                ':hover': {
                    backgroundColor: colors.black,
                },
                ...(state.disabled && {
                    backgroundColor: colors.grey200,
                    color: colors.grey800,
                }),
            },
            link: {
                backgroundColor: 'none',
                color: colors.blue,
                width: '20%',
                textAlign: 'center',
                margin: 'auto',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                gap: '0',
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
            xs: {
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
                    transform: 'rotate(180deg)',
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
