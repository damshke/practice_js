import { extractCSSOption, OptionizedCSS } from '@greensight/gds';
import { Variants, Sizes } from '../enums';
import { SelectTheme } from '../types';

export const basicSelectTheme: SelectTheme<typeof Variants, typeof Sizes> = {
    label: state => {
        const sized: OptionizedCSS<typeof Sizes> = {
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

export const SELECT_THEMES = {
    basic: basicSelectTheme,
};
