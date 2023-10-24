const gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass')(require('sass')),
    sync = require('browser-sync');

const path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.*',
        css: 'src/styles/*.scss',
        js: 'src/js/*.js',
        img: 'src/img/*.*',
        fonts: 'src/fonts/Roboto/*.*'
    },
    clean: 'build',
};

const buildCSS = () =>
    gulp
        .src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: true,
            }).on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                cascade: false,
                remove: true,
            })
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.css));

const buildHtml = () =>
    gulp
        .src(path.src.html)
        .on('error', function (e) {
            gutil.log(e.plugin, gutil.colors.red(e.message));
        })
        .pipe(gulp.dest(path.build.html));

const clean = () => del(path.clean);

const buildJs = () =>
    gulp
        .src(path.src.js)
        .on('error', function (e) {
            gutil.log(e.plugin, gutil.colors.red(e.message));
        })
        .pipe(gulp.dest(path.build.js));

const buildImg = () => gulp.src(path.src.img).pipe(gulp.dest(path.build.img));

const buildFonts = () => gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));

const buildFunction = () => gulp.series(clean, buildHtml, buildCSS, buildJs, buildImg, buildFonts);

exports.build = buildFunction();

const serverFunction = () =>
    sync({
        server: {
            baseDir: ['build', 'src'],
        },
        tunnel: false,
        host: 'localhost',
        port: 3000,
    });

const watchFunction = () => {
    gulp.watch('src/css/*.css', gulp.series(buildCSS));
    gulp.watch('src/js/*.js', gulp.series(buildJs));
    gulp.watch('src/*.*', gulp.series(buildHtml));
    gulp.watch('src/img', gulp.series(buildImg));
    gulp.watch('src/fonts', gulp.series(buildFonts));
};

exports.dev = gulp.parallel(buildFunction, watchFunction, serverFunction);
