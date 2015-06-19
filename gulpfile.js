/**
 * Created by Jason on 2015/6/18.
 */
var  gulp=require('gulp');
var uglify=require('gulp-uglify');
var jsHint=require('gulp-jshint');
var minify=require('gulp-minify-css');
var imagemin=require('gulp-imagemin');
var concat=require('gulp-concat');
var  rename=require('gulp-rename');
var zip=require('gulp-zip');

gulp.task('Uglify js Files',function(){
    //压缩js，并合并
    gulp.src('./public/javascript/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/javascript/min/'))
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('Uglify css Files',function(){
    //压缩css，并合并
    gulp.src('./public/style/*.css')
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/style/min/'))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('Uglify image Files',function(){
    //压缩图片
    gulp.src('./public/image/*.jpg')
        .pipe(imagemin({optimizationLevel:3,progressive:true,interlaced:true}))
        .pipe(gulp.dest('./build/images'));
});

var path = {
    minscripts: ['./public/javascript/jquery-1.10.2.min.js'],
    scripts: [ './public/javascript/*'],
    styles: ['./public/style/*'],
    images: './public/image/*',
    zip: ['**',
        '.gitignore',
        '!test.js','!test_new.js',
        '!log/**','!log',
        '!test/**','!test',
        '!node_modules/**','!node_modules',
        '!public/image/**','!public/image',
        '!public/javascript/**','!public/javascript',
        '!public/style/**','!public/style',
        '!gulpfile.js']
};
//压缩文件
gulp.task('zip',['Uglify js Files','Uglify css Files','Uglify image Files'], function () {
     return gulp.src(path.zip)
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('zip'));
});

//依次执行
gulp.task('default',['zip']);




