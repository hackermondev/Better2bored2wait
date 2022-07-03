# Build program to executable file
# Should be ran from the root directory of the project

npm list -g | grep pkg || npm install -g pkg
pkg -d --compress Brotli .