import { CSSObject } from '@emotion/core';
import { createFutureButtonWithTheme } from '@greensight/gds';
import { TypographyParam } from '@scripts/gds';
import { Sizes, Variants } from './enums';
import { BUTTON_THEMES } from './themes/basic';

function customTypography(
    name: 'xs' | 'xsMedium' | 's' | 'sMedium' | 'm' | 'mMedium' | 'l' | 'lMedium' | 'h4' | 'h3' | 'h2' | 'h1'
): CSSObject {
    throw new Error(`Function not implemented. name: ${name}`);
}

const Button = createFutureButtonWithTheme<typeof Variants, typeof Sizes, TypographyParam>(
    BUTTON_THEMES.basic,
    Variants.primary,
    Sizes.xs,
    customTypography
);

export default Button;
