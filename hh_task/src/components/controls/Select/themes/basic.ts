import { extractCSSOption, OptionizedCSS, scale } from '@greensight/gds';
import { colors, MEDIA_QUERIES, shadows, typography } from '@scripts/gds';
import { Variants, Sizes } from '../enums';
import { SelectTheme } from '../types';

export const basicSelectTheme: SelectTheme<typeof Variants, typeof Sizes> = {
    label: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                ...(typography('xsMedium') as any),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                color: colors.black,
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },

    selectContainer: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                gap: scale(1, true),
                [MEDIA_QUERIES.sm]: {
                    width: '100%',
                },
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
        };
    },

    select: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                height: scale(9, true),
                padding: `${scale(1, true)}px ${scale(3, true)}px`,
                gap: scale(1),
                borderRadius: scale(1, true),
                minWidth: `${scale(30) + 2}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                color: colors.grey600,
                backgroundColor: colors.white,
                border: `${scale(1, true) - 3}px solid ${colors.grey400}`,
                background: colors.white,
                ...(state.isOpen && {
                    border: `${scale(1, true) - 3}px solid ${colors.blue}`,
                }),
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },

    arrowButton: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                width: scale(2),
                height: scale(2),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                backgroundColor: colors.white,
                color: colors.grey800,
                ...(state.isOpen && {
                    color: colors.black,
                }),
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },

    optionsList: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                boxShadow: shadows.box,
                ...(state.isOpen && {
                    display: 'block',
                }),
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
        };
    },

    option: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                padding: `${scale(1)}px ${scale(3, true)}px`,
                ...typography('s'),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                color: colors.black,
                backgroundColor: colors.black,
                ...(state.isOpen && {
                    color: colors.white,
                    backgroundColor: colors.blue,
                    cursor: 'pointer',
                }),
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },
};

export const SELECT_THEMES = {
    basic: basicSelectTheme,
};
