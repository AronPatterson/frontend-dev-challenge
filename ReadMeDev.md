# Installation
To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

I know this sort of goes against the "include all dev" part of the instructions, but I don't want to pollute your Git with a bunch of npm/bower files, and I think using Gulp will add to the "cool" factor here!

To install and modify the test template, download it onto your local machine, command line into the folder, and run:

```bash
npm install
bower install
```

- Note: If it gives Bower as an invalid command, use the following to make sure Bower is installed globally:
- ```bash
- npm install -g bower
- ```

Node Package Manager (NPM) will install all of the Gulp plugin dependencies, including the super-awesome SASS/JS/Images minifier.

Bower will install all of the Foundation dependencies.

To compile afterward, use:

```bash
foundation watch
```

This will watch the local file structures for changes. All unminified files, including SASS/Javascript, are located inside of the '/min' folder, to keep everything better organized.

All of this coding is open source (I use this setup for my Portfolio site), and uses a heavily-modified variation of the Foundation 6 template with extra Gulp plugins.

All old assets are located inside of the 'etc' folder.