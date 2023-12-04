const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-plugin-svgr');

const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: [],
    },
    swcMinify: true,
    compiler: {
        emotion: true,
    },
    trailingSlash: true,
};

const config = withPlugins(
    [
        withSvgr({
            svgrOptions: {
                svgo: false,
                titleProp: true,
            },
        }),
    ],
    nextConfig
);

module.exports = (phase, { defaultConfig }) => {
    delete defaultConfig.webpack5;
    delete defaultConfig.webpackDevMiddleware;
    delete defaultConfig.configOrigin;
    delete defaultConfig.target;

    return config(phase, { defaultConfig });
};
