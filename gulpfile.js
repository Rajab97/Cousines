const { src, watch, task, series, parallel, dest } = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
// var reload = browserSync.reload;

var scssSrc = 'sass/styles.scss';
var cssDest = './assets/css/'
var scssWatchSrc = 'sass/**/*.scss';

var jsSrc = 'js/scripts.js'
var jsFiles = ['js/scripts.js'];
var jsDest = "./assets/"
var jsWatchSrc = ['js/modules/**/*.js', 'js/scripts.js'];

var htmlWatchSrc = './**/*.html';

var imgWatchSrc = 'img/**/*.*';
var imgDest = './assets/img/'

task('sass', function(done) {
    src(scssSrc)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(cssDest))
        .pipe(browserSync.stream());
    done();
});

task('img', function(done) {

    src(imgWatchSrc)
        .pipe(imagemin())
        .pipe(dest(imgDest));

    done()
})


task("js", function(done) {
    jsFiles.map(function(entry) {
        return browserify({
                entries: [entry]
            })
            .transform(babelify, { presets: ['@babel/preset-env'] })
            .bundle()
            .pipe(source(entry))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(dest(jsDest))
            .pipe(browserSync.stream());
    })
    done();
})



task("browser-sync", function(done) {
    browserSync.init({
        open: true,
        injectChanges: true,
        server: {
            baseDir: "./"
        }
    });
    done();
});


task('watch', parallel('sass', 'js', function(done) {
    watch(scssWatchSrc, series('sass', reload));
    watch(jsWatchSrc, series('js', reload));
    watch(htmlWatchSrc, series(reload));
    watch(imgWatchSrc, series(reload));

    done();
}));
task('default', parallel('img', 'watch', 'browser-sync'));

function reload(done) {
    browserSync.reload();
    done();
}