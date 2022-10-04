# ng-mfe-npmws-nx

A Micro frontends playground repo, most of the "heavy lifting" research was done on a real code base
which led to more edgy cases. 

My opinion: I wouldn't recommend starting a new project as a micro frontends first (and wouldn't mix different frameworks which has their own "runtime" code such as React or Angular),
In case your organisation structure forces you to have micro frontends it really depends of the isolation level of each module (app), when there are no dependencies between apps it's easier to go for a configuration approach of single versioning monorepo and module federation, or another way is to design ahead a structure in which each app could run independently but have a "root" app which consumes each app as a module/library (not an app) and when starting that up all parts plays well - such solution only fits single framework not mixture and based on routes but if you'll have a team which do not have their own page, just adding features in other teams pages - you'll create an overhead and there's no perfect solution no matter which approach, so generally yeah, I'm not forward micro-frontends. 


Relevant --> With i-frames (local)
- have the hosted app in a local (same origin) iframe 
- install my [cross docs messages lib](https://www.npmjs.com/package/cross-document-messenger) for host <--> child communication
- nice to have --> a tiny server with a basic login

Irrelevant --> With module federation:

My opinion:
Module federation felt a bit flaky (there's a policy issue with web workers fetched from different origin for e.g.)
and basically forces you to write the app parts on a certain way (which is generally good) which adds tones of overhead 
for a huge frontend monolith with areas of coupled code (we're not leaving on a simple case scenarios), we also had some nasty versioning issues.
+Even though vite also have own federation-like plugin,
the thought of limiting the stack to webpack isn't tempting as well...


Playground repo for getting a better grasp of combining:

![img.png](image.png)
- npm workspaces (pkg mgmt)
- nx (build/dev tooling)
- wp5 module federation, enable cross micro frontends, Angular + React

And see if combining the 3 could fit my current needs.

Goals:
1. Have feature apps with own package json for version mgmt control when publishing 
to npm / artifactory. will check out "generatePackageJson": true
2. Development: using nx - have a command which starts the shell and a specific ft app.
3. Build: using nx configure building the shared vendors - e.g. the framework.


Getting Started npm workspaces: 

- Adding new package/project to the workspace packages:
``npm init -w ./packages/app-x``

- Running np script for single package example: 
``npm run test --w=packages/app-x``

- Running np script for all packages example: 
``npm run test --ws``


Getting started with NX as build tool:
- Start all apps example: ```nx run-many --target=start --all```
- Start specific app example: ``` nx run host-app:start```

CookBook:

### Starting a monorepo with npm workspaces:

- Init an npm workspace projects (see readme for instructions)
- Inside packages I generated 2 angular apps using the angular cli (removed the generated node_modules of each app)
- Run: ``npm i ws`` To install all dependencies
- Run: ``npm start --w=packages/feature-app`` just for testing ability to start one app seperatly
- NOTE - can't start both apps using ``npm start ws``, Let's integrate NX

### Integrating the NX building tool
- Followed the [Adding Nx to Lerna/Yarn/PNPM Workspace
  ](https://nx.dev/l/a/migration/adding-to-monorepo) guide
- Run ``npx add-nx-to-monorepo``
- Had to upgrade the typescript version

### Combine module federation (Angular host app):
- install ```@angular-architects/module-federation ```
- Generate the shell app ``npx nx g @nrwl/angular:app shell --mfe --mfeType=host --routing=true``
- Generate the feature app `` nx g @nrwl/angular:app ft1_app --mfe --mfeType=remote --port=4201 --host=shell --routing=true
  ``
- Include package.json file with each app version and dependencies for future publishing
- Tweak the ts configs
- Serve both: ``nx run shell:serve-mfe``

Configuration tweaks:
- prefer project.json in every project rather huge workspace.json
- In order to have the package.json copied to dist I created a script on each project e.g. --> 
``"cp:pkjson": "cp package.json ../../dist/packages/shell/"``
and an npm script on the root package.json which applies the copy to all the projects 
``nx run-many --target=build --all && npm run --ws cp:pkjson``
- Prefer the use of webpack's externals to exclude packing the frameworks of micro-apps
- React app ** overwriting the webpack configuration 

Issues to follow:

apps reload loop: 
- https://github.com/nrwl/nx/issues/7862 -watch this issue!!! (follow this PR: https://github.com/nrwl/nx/pull/8020)
- https://github.com/angular-architects/module-federation-plugin/issues/96 
- https://github.com/webpack/webpack/pull/14827


- manually added "baseUrl": "packages" in base ts config
- https://github.com/nrwl/nx/issues/1777
- there's no schematic for adding react as micro app with module federation 


Dev container image:

``docker build -t frontends-container:latest -f Dockerfile .``

Run: 
```docker run -d -p 8080:80 frontends-container:latest```
