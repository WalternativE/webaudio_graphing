#How to use this repo

##Build tools
Make sure you have Node.js including npm installed and execute following statements in the root directory.

```
npm install -g bower
npm install -g gulp

npm install
bower install
```

I do not have configured gulp yet to watch and compile TypeScript files. I am using Visual Studio Code
to compile the .ts files - if you don't have a setup just execute the following commands (make sure to be
in the root directory for compiling the .ts files).

```
npm install -g typescript
tsc -p .
```

For serving a local light weight web server instance listening on localhost:8080 use the following command
in the project root directory (wherever the gulpfile.js is).

```
gulp
```

If you encounter problems while installing the npm packages globally make sure you are either
using an elevated console on Windows or the `sudo` command on NIX systems.