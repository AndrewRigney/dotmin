# dotmin
Miniscule JavaSript app framework

## Demo
 - https://dotmin-pwa.web.app/
 
## Dependencies
### gulp
`npm install gulp --global`
### gulp-del
`npm install --save-dev gulp del`
### gulp-replace
`npm install --save-dev gulp-replace`
### gulp-htmlmin
`npm install --save-dev gulp gulp-htmlmin`
### gulp bundle and minify CSS
`npm install --save-dev gulp-postcss postcss cssnano gulp-concat`
### gulp bundle and minify JS
`npm install --save-dev gulp-terser gulp-rename`
### gulp server
`npm install --save-dev browser-sync`

## Build
gulp will deploy production files to *public* and set the buildTarget to PROD which suppresses console.log() & console.info() output

## Serve
`gulp serve`
Runs https on port 3000

### Resources
- https://webdesign.tutsplus.com/articles/essential-cheat-sheet-convert-jquery-to-javascript--cms-35633
- https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#working-with-events
- https://blog.bitsrc.io/you-dont-need-lodash-or-how-i-started-loving-javascript-functions-3f45791fa6cd
- https://www.sitepoint.com/lodash-features-replace-es6/
