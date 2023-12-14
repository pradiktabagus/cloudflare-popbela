# popbela.com

## Requirement

- Node version 16+ or LATEST (recommended)
## Folder structure
> Folder structure 

### A typical top-level directory layout

    .
    ├── .next                   # Compiled files
    ├── docs                    # Documentation files
    ├── public                  # Base path project
    └── src                     # Source files
        ├── adapters            # Hook function pada pages dan components
        ├── components          # Kumpulan reuseable component
        ├── containers          # Gabungan antara section pada sebuah page
        ├── layouts             # Meta dan script
        ├── pages               # Halaman page
        ├── sections            # Kumpulan section reuseable 
        ├── styles              # Style global
        ├── templates           # Template untuk layout suatu page
        ├── types               # Kumpulan dari type yang reuseable
        ├── utils               # Utility
    └── LICENSE
    └── README.md
    └── .env                    
    └── server                  
    └── commitlint.config.js                  
    └── jest.config.js                  
    └── jest.setup.js                  
    └── lint-stagged.config.js                  
    └── next.config.js                  
    └── postcss.config.js                  
    └── tailwind.config.js                  
    └── tsconfig.js                  

## Installation

### Preparation

1. Clone Repository
```
$ git clone https://github.com/IDN-Media/v3.popbela.com.git
```

2. Install Node Module
```
$ npm install
```

### Build

**Run The Project**

Run locally
```
$ npm run dev
```

### Deploy to production

You can see the results locally in production mode with:

```shell
$ npm run build
$ npm run start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

You can create an optimized production build with:

```shell
npm run build-prod
```

Now, your blog is ready to be deployed. All generated files are located at `out` folder, which you can deploy with any hosting service.

Untuk build pastikan dulu environment variable sesuai (.env)
``` bash
BASE_URL=
API_BASE_URL=
```

**Run ESLint and Prettier for Linting**

1. Use this script for one time only

```bash
$ npm run lint
```

2. Use this script to run ESLint and Prettier whenever you save your file

```bash
$ npm run lint-watch
```
**View our Components Documentation**

Use this script to run Unit testing

```bash
$ npm run test
```

## How to commit
In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Real world examples can look like this:

```
chore: run tests on travis ci
```

```
fix(server): send cors headers
```

```
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Don't forget to fetch and rebase from branch <b>Master</b> first before push.

**Fetch all remotes**

```
$ git fetch -all
```

**Rebase Master**

```
$ git rebase <master branch>
```

**Add new file or change file**

```
$ git add <file name>
```

**Add all new file**

```
$ git add .
```

**Confirm file addition or change**

```
$ git commit -m "<commit message>"
```

**Post changes to the repository**

```
$ git push origin <branch name>
```

## NOTES
Semua file json dimasukkan difolder data dan diberi ektensi .example
Tambahkan gitignore untuk json filenya 
