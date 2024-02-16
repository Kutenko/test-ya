const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const replace = require('gulp-replace');
const concat = require('gulp-concat');

// Task for processing Pug files
function html() {
  return src('src/*.pug')
    .pipe(pug({ pretty: '\t' }))
    .pipe(dest('dist/'));
}

// Task for processing Sass files
function css() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(dest('dist/css'));
}

// Task for processing JavaScript files
function javascript() {
  return src('src/js/*.js')
    .pipe(dest('dist/js'));
}

// Task for optimizing images
async function optimizeImages() {
  const { default: imagemin } = await import('gulp-imagemin');
  return src('src/images/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}


// Task for watching files
function watchFiles() {
  watch('src/**/*.pug', html);
  watch('src/**/*.scss', css);
  watch('src/js/*.js', javascript);
  watch('src/images/**/*', optimizeImages);
}

// Run file tracking task
exports.watch = watchFiles;

// Run all tasks
exports.default = watchFiles;
