# How to use this repo

## Build tools
Make sure you have Node.js including npm installed and execute following statements in the root directory.

```
npm install -g bower

npm install
bower install
```

For serving a local development weight web server instance listening on localhost:3000 use the following command
in the project root directory (wherever the package.json is). Until terminated the typescript files will be watched and recompiled
after every change. Changes will also cause the webpage to refresh (on the courtesy of browserify).

```
npm start
```

In some cases (working on *NIX Systems) you will have to use this command as a sudoer otherwise the development server can not
bind to port 3000.

If you encounter problems while installing the npm packages globally make sure you are either
using an elevated console on Windows or the `sudo` command on NIX systems.
