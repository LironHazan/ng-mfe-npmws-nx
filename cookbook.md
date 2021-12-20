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

### Combine module federation:
- install ```@angular-architects/module-federation ```
- Generate the shell app ``npx nx g @nrwl/angular:app shell --mfe --mfeType=host --routing=true``
- Generate the feature app `` nx g @nrwl/angular:app ft1_app --mfe --mfeType=remote --port=4201 --host=shell --routing=true 
  ``
- Include package.json file with each app version and dependencies for future publishing
- Tweak the ts configs 
- Serve both: ``nx run shell:serve-mfe``

### NX useful commands:
- move e2e into tested project: ```nx g @nrwl/workspace:move --project ng-app-t
  wo-e2e ng-app-two```
