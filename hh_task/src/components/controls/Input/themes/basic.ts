import { extractCSSOption, OptionizedCSS } from '@greensight/gds';
import { Variants, Sizes } from '../enums';
import { InputTheme } from '../types';

export const basicInputTheme: InputTheme<typeof Variants, typeof Sizes> = {
    input: state => {
        // заполнить стилями
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
