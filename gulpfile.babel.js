'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import gulp     from 'gulp';
import yaml     from 'js-yaml';
import fs       from 'fs';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag; if false, prints out sourcemaps
const PRODUCTION = true;

// Load settings from settings.yml
const { COMPATIBILITY, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('min/scss/style.scss')
	.pipe($.sourcemaps.init())
	.pipe($.sass({
	  includePaths: PATHS.sass
	})
	  .on('error', $.sass.logError))
	.pipe($.autoprefixer({
	  browsers: COMPATIBILITY
	}))
	.pipe($.if(PRODUCTION, $.cssnano()))
	.pipe($.if(!PRODUCTION, $.sourcemaps.write()))
	.pipe(gulp.dest('./')) // write it right to WP's style.css
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
	.pipe($.sourcemaps.init())
	.pipe($.babel())
	.pipe($.concat('app.min.js'))
	.pipe($.if(PRODUCTION, $.uglify()
		.on('error', e => { console.log(e); })
	))
	.pipe($.if(!PRODUCTION, $.sourcemaps.write()))
	.pipe(gulp.dest('js'));
}

// Copy and minify images
// In production, the images are compressed
function images() {
  return gulp.src(PATHS.images)
	.pipe($.imagemin({
		progressive: true
	}))
	.pipe(gulp.dest('img'));
}

// Watch for changes to Sass, JavaScript, and Images
function watch() {
	gulp.watch('min/scss/**/*.scss', sass);
	gulp.watch('min/js/**/*.js').on('change', gulp.series(javascript));
	gulp.watch('min/img/**/*').on('change', gulp.series(images));
}

// Build the site by running all of the below tasks
gulp.task('build',
 gulp.series(gulp.parallel(sass, javascript, images)));

// Build the site and watch for file changes
gulp.task('default',
  gulp.series('build', watch));