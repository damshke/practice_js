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
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: scale(1, true),
                width: '100%',
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
                height: scale(5) + 4,
                padding: `${scale(1, true)}px ${scale(3, true)}px`,
                gap: scale(1),
                borderRadius: scale(1, true),
                minWidth: `${scale(30) + 2}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ...typography('s'),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                color: colors.black,
                backgroundColor: colors.white,
                border: `${scale(1, true) - 3}px solid ${colors.grey400}`,
                background: colors.white,
                ':hover': {
                    border: `${scale(1, true) - 3}px solid ${colors.blue}`,
                },
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
                ...(state.isOpen && {
                    transform: 'rotate(180deg)',
                }),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                backgroundColor: colors.white,
                color: colors.grey800,
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
                marginTop: scale(1, true),
                borderRadius: scale(1, true),
                padding: '0',
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                listStyle: 'none',
                width: '100%',
                position: 'absolute',
                top: scale(8),
                boxShadow: shadows.box,
                zIndex: 2,
                display: 'none',
                ...(state.isOpen && {
                    display: 'block',
                }),
            },
        };

        return {
            ...extractCSSOption(sized, state.size),
            ...extractCSSOption(varianted, state.variant),
        };
    },

    option: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
            md: {
                padding: `${scale(1)}px ${scale(3, true)}px`,
                width: '100%',
                ...typography('s'),
            },
        };

        const varianted: OptionizedCSS<typeof Variants> = {
            primary: {
                color: colors.black,
                backgroundColor: colors.white,
                cursor: 'pointer',
                ':hover': {
                    backgroundColor: colors.blue,
                    color: colors.white,
                },
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
