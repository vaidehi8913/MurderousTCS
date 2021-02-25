
Welcome to our "book"!  Here are some miscellaneous things you might want to 
know before reading/editing/messing with our code.

# What is it?
It's a comic book! Well, kind of. It's a story with comics, dialogue, and
interactive components.  It is displayed on a website (written in React).

The story is a zany adventure, where the main characters Vaidehi and 
Parmita learn about various computational models, and eventually 
get to undecidability. It's geared toward people with no computer
science background, middle schoolers and up. It's fun. Read it! :)

The idea is inspired by Kjartan Poskitt's amazing Murderous Maths books.
Since we don't have a real name for it yet, it's "code name" (so to speak)
is "MurderousTCS" (TCS for theoretical computer science).

# How do I run it?

Make sure you have npm downloaded.  If it is your first time opening up this project, then you want to make sure that you have all of the necessary packages by running 

    npm install

Then as long as you are in the project directory (MurderousTCS/book) you can run: 

    npm start

If you want to use debug mode, there's a section in this README on how to
use it.

# Project Structure
If you want a basic idea of the project structure, it's actually not a bad
idea to start with the JSON documentation at 

    src/chapter-jsons/json_guide.md 

The organization of the React components is basically the same as the 
organization of the JSON objects (the serialization of the object looks 
like the object? Go figure!)

At a very high level: this project is basically entirely based on what I 
learned from Kirupa Chinnathambi's book: "Learning React: A Hands-On Guide 
to Building Web Applications Using React and Redux"

That means that it is technically a Single-Page App, even though it behaves
as though each chapter is a separate page.  You can see the main routing
at work in 

    src/Main.js

The home page isn't super interesting, so I'm not going to talk about it :)

The Chapter component has three main divisions.  On the left is the 
NavigationBar (or navbar as it is inconsistetly shortened in many variable
names).  In the middle is the ContentBox.  On the right is the ExtrasBar.  
The ExtrasBar is designed for material related to the content that the 
reader can skip if they want.  

The code is all about formatting the page.  All of the content (including 
chapter content, what the navbar has, etc.) is loaded from json files that 
are in 

    src/chapter-jsons


# JSON Documentation
Don't care about the formatting? Just want to edit the content?  Then you
are probably looking for the JSON files.  You can find them in the 
directory 

    src/chapter-jsons 

Need help figuring out what the JSONs mean?  The JSON documentation is at

    src/chapter-jsons/json_guide.md


# Content
Looking for content that isn't in the JSON yet, or old script drafts?
The script is actually on Google Drive in a shared folder also called
MurderousTCS, not this git repo.


# Images
Looking for the source images that we use? You can find them under

    src/images


# Our To-Do List

EDIT: That To-do list is obsolete.  Now we keep track of issues and 
improvements using the git issues on this project.

This is where we track issues and improvements that we want to get to.
You can find this in 

    src/implementation-to-do.md


# Debug mode
We have a debug mode!!! I know, so legit right?

You can turn it on by setting the constant 

    DEBUG 

in 

    src/Constants.js

It can be set to 0, 1, 2, or 3.  Here's what the different levels do.

## 0:  No debug mode
See the website as it was designed to look.

## 1:  Basic background colors
Background colors for the main components only.  This simply
tells you where the home page (green), navigation bar (yellow),
content box (blue), and extras bar (pink) are showing up

## 2:  Detailed background colors
This includes a different background color for every component 
we can include background colors for (so divs not images lol).
This is useful to visualize margins and see invisible components.

We try to keep these colors in the same color group as their parent
(so shades of yellow if it's in the navbar, etc.), though this 
isn't always the case for components that show up in multiple 
settings (like the chapterNavigator on the homePage).

## 3:  Detailed background colors and console output
If we are printing debug messages to the console, we wrap it in
a conditional so it only prints on debug level 3.  This just lets
us turn off the print statements easily.  We should probably 
clean the obsolete ones out every so often...


# README Leftover from create-react-app

(we used create react app to make this, and this was the readme it came with.
I don't know what is going on well enough to delete it quite yet)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
