import tokens from '../../../../public/tokens.json';

export const global = {
    base: {
        body: {
            typography: 'body',
            color: tokens.colors.black,
            bg: tokens.colors.white,
        },
        focus: {
            width: 2,
            color: tokens.colors.blue,
            offset: 2,
        },
        selection: {
            color: tokens.colors.white,
            bg: tokens.colors.blueHover,
        },
    },
    fonts: {
        families: {
            Roboto: {
                stack: '-apple-system, Roboto, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            },
        },
        fontFace: [
            {
                '@font-face': {
                    fontFamily: 'Roboto',
                    src: 'url("../../../fonts/Roboto-Regular.ttf") format("ttf")',
                    fontDisplay: 'swap',
                },
            },
            {
                '@font-face': {
                    fontFamily: 'Roboto',
                    src: 'url("../../../fonts/Roboto-Medium.ttf") format("ttf")',
                    fontDisplay: 'swap',
                    fontWeight: 500,
                },
            },
            {
                '@font-face': {
                    fontFamily: 'Roboto',
                    src: 'url("../../../fonts/Roboto-Bold.ttf") format("ttf"), url("../../../onts/Roboto-Bold.ttf") format("ttf")',
                    fontDisplay: 'swap',
                    fontWeight: 700,
                },
            },
        ],
    },
};
