## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

Deploys the app using a customers script, only used/useable within github actions.\
It installs all the required npm packages, builds the application and deploys that build to the gh-pages branch. It is then picked up for hosting through github pages.

### `npm run prettier`

Runs prettierrc on the project to clean up all the files and add some consistency to it all.\
This ignores the build, node_modules, and .github folders.\
More config can be found in .prettierrc.json and at [prettier.io/docs/en/options.html](https://prettier.io/docs/en/options.html)
