// import scss
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}
// import svg
declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.woff2';

declare const __IS_DEV__: boolean;
