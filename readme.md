Project motivation:

Getting a better grasp of combining:

- npm workspaces (pkg mgmt)
- nx (build/dev tooling)
- wp5 module federation (enable micro frontends)

And see if combining the 3 could fit my current needs 

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
