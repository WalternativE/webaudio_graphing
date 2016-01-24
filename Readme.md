#How to use this repo

##Build tools
Make sure you have Node.js including npm installed and execute following statements in the root directory.

```
npm install -g bower
npm install -g gulp

npm install
bower install
```

For serving a local light weight web server instance listening on localhost:8080 use the following command
in the project root directory (wherever the gulpfile.js is). Most recently I came around to configure
gulp to also watch and compile typescript files. As typescript pretty much is a superset of javascript
please make your changes in the .ts files - they compile to javascript which is otherwise overitten.

```
gulp
```

If you encounter problems while installing the npm packages globally make sure you are either
using an elevated console on Windows or the `sudo` command on NIX systems.