const { src, dest, series, watch, task, run } = require('gulp');
const del = require('del');

async function cleanGraphqlMobile() {
    return del(['dist/graphqls/mobile/**/*.graphql']);
}

function buildGraphqlMobile() {
    return src('src/graphqls/mobile/**/*.graphql').pipe(dest('dist/graphqls/mobile/'));
}

task('default', function () {
    watch('src/graphqls/mobile/**/*.graphql', series([cleanGraphqlMobile, buildGraphqlMobile]));
});

exports.init = series([cleanGraphqlMobile, buildGraphqlMobile]);
