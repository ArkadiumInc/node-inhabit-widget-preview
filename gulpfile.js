const gulp      = require('gulp');
const through   = require('through-gulp');

const moveDepsToPeer = () => through(function (file, encoding, cb) {
  if (file.isBuffer()) {
      file.contents = Buffer.from(
          file.contents.toString().replace(/"dependencies"/g, '"peerDependencies"')
      );
  }
  this.push(file);
  cb();
});

gulp.task('default', ['postbuild']);

/**
 * Postbuild task
 */
gulp.task('postbuild', [ 'copy:package', 'copy:readme']);

/**
 * Copy package.json and rewrite dependecies to peerDependencies
 */
gulp.task('copy:package', () => gulp
  .src('./package.json')
  .pipe(moveDepsToPeer())
  .pipe(gulp.dest('./dist/'))
  .on('error', err => gutil.log(err)));

/**
 * Copy README.md
 */
gulp.task('copy:readme', () => gulp
  .src('./README.md')
  .pipe(gulp.dest('./dist/'))
  .on('error', err => gutil.log(err)));