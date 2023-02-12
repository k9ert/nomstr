# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It's just a little side-project to learn react and Tailwind. The simple usecase here is to backup liks from [diigo](https://github.com/cconrad/diigo-backup), copy the json file in the src directory, and then:

```
npm i
npm run start
```

also, you might want to start the strawberry server (which is not yet integrated)
```
virtualenv --python=python3 .env
. ./.env/bin/activate
pip3 install -r requirements.txt 

flask run
# alternatively run strawberry direct:
# strawberry server schema
# follow ths server:
http://0.0.0.0:5000/graphql

# for strawberry direct:
#http://0.0.0.0:8000/graphql
```

```
{
  bookmarks {
    title
		desc    
    
  }
}
```

The app should show a tag-cloud on the left and the links in the main area.

# Versions history
I try to have a very clean git commit history and lots of tags.

## v0.0.1
initial version, all in App.js

## v0.0.2
Refactored most stuff to Lib.js

## v0.0.3
Adding React Routing (but without Layout)

## v0.0.4
Added Layout with nesting

## v0.1.0
* Moving to something like semver
* Having tag links (still as not all tags are shown on tag page)

## v0.1.1
* Render all tags on the left side for the tag page
* Some bugfixes

## v0.2.0
* enable editing of tags (for bookmarks only)

## v0.3.0
* Adding and deleting tags

## v0.4.0
* Backend now works via SQLAlchemy in a SQLLite instance
* Two tables: Tag and Bookmark






What follows is the original content which react created:


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
