Project motivation:

Getting a better grasp of combining:

- npm workspaces 
- nx 
- wp5 module federation 

And see if combining the 3 could fit my current needs 

Getting Started npm workspaces: 

- Adding new package/project to the workspace packages:
``npm init -w ./packages/app-x``

- Running np script for single package example: 
``npm run test --w=packages/ng-app-two``

- Running np script for all packages example: 
``npm run test --ws``
