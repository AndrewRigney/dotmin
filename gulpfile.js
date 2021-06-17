const gulp = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

//Start series
const clean = () => {
    return del(['public']);
};

//Start parallel
const html = () => {
    return gulp
        .src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            useShortDoctype: true,
            removeComments: true,
            minifyCSS: true
        }
        ))
        .pipe(gulp.dest('public'));
};

const manifest = () => {
    return gulp
        .src('*.webmanifest')
        .pipe(gulp.dest('public'));
};

const sw = () => {
    return gulp
        .src('service-worker.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public'));
};

const css = () => {
    return gulp
        .src('css/**/*.css')
        .pipe(concat('app.min.css'))
        .pipe(postcss([cssnano({ discardComments: { removeAll: true } })]))
        .pipe(gulp.dest('public/css'));
};

const js = () => {
    return gulp
        .src(['js/core-service.js',
            'js/app.js',
            'js/service-worker.js'])
        .pipe(concat('bundle.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('public/js'));
};

const vendorJs = () => {
    return gulp
        .src('js/vendor/*.js')
        .pipe(gulp.dest('public/js/vendor'))
};

const models = () => {
    return gulp
        .src('js/models/**/*.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/js/models'))
};

const views = () => {
    return gulp
        .src('views/**/*.html')
        .pipe(gulp.dest('public/views'))
};

const viewControllers = () => {
    return gulp
        .src('views/controllers/**/*.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/views/controllers'))
};

const controllers = () => {
    return gulp
        .src('js/controllers/**/*.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/js/controllers'))
};

const ico = () => {
    return gulp
        .src('ico/**/*.*')
        .pipe(gulp.dest('public/ico'))
};

const img = () => {
    return gulp
        .src('img/**/*.*')
        .pipe(gulp.dest('public/img'))
};

const artwork = () => {
    return gulp
        .src('artwork/**/*.*')
        .pipe(gulp.dest('public/artwork'))
};
//End parallel
//End series

const reload = (done) => {
    browserSync.reload();
    done();
}

const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: './public',
            https: true,
            notify: false
        }
    });
    done();
}

const watch = () => {
    gulp.watch('js/*.js', { delay: 1000 }, gulp.series(js, reload));
    gulp.watch('*.html', { delay: 1000 }, gulp.series(html, reload));
    gulp.watch('js/models/**/*.js', { delay: 1000 }, gulp.series(models, reload));
    gulp.watch('js/controllers/**/*.js', { delay: 1000 }, gulp.series(controllers, reload));
    gulp.watch('views/controllers/**/*.js', { delay: 1000 }, gulp.series(viewControllers, reload));
    gulp.watch('js/models/**/*.js', { delay: 1000 }, gulp.series(models, reload));
};

exports.default = gulp.series(clean, gulp.parallel(html, manifest, sw, css, js, vendorJs, models, views, viewControllers, controllers, ico, img, artwork), serve, watch);
exports.build = gulp.series(clean, gulp.parallel(html, manifest, sw, css, js, vendorJs, models, views, viewControllers, controllers, ico, img, artwork));
exports.serve = gulp.series(serve);