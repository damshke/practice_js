import { CSSObject } from '@emotion/core';

declare module 'react' {
    interface Attributes {
        css?: CSSObject;
    }
}
