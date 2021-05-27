# Madara ✍️

A way for people to manage their tasks 🗒️

## Process and Goal 💪

Madara was designed in Figma 🖌️

I focused heavily on Testing, UX, and Accessibility 😄

The past 3 months were a deep dive into Accessibility, so throughout the process, I continuously improved and redesigned the project 🔥

My favorite part with this project, aside from the Accessibility stuff I've learned, was implementing the Drag and Drop feature 🥳

It was also really fun writing the various custom hooks 👏

My main inspiration for this project was Github Project 😁

I'm really happy right now to have finally finished it, sometimes it felt like it was never gonna be finished due to the number of accessibility improvements you can make 🦊 🔥 🎊 🎉

## Known Behaviour / Bug 🤧

A flickering that happens when you reorder the tasks.
This is because I'm using Firebase Firestore, the option to update a single index of an array doesn't exist, and the solution was to modify the whole array of tasks and then update it. 😐
<br>
<br>
Nevertheless, I'm happy with this project, it was a journey that taught me a lot about Accessibility. 😁

## Installation 🛠️

After cloning the project, you need to run `yarn` 🔧

This project uses 7 environment variables, which you can retrieve after creating a Firebase project. 🤠
<br>
Create a `.env.development.local` file in the root folder. 💫
<br>
<br>
The environment variables it should have:
<br>
<br>
`REACT_APP_API_KEY`
<br>
`REACT_APP_API_APP_ID`
<br>
`REACT_APP_API_AUTH_DOMAIN`
<br>
`REACT_APP_API_PROJECT_ID`
<br>
`REACT_APP_API_STORAGE_BUCKET`
<br>
`REACT_APP_API_MESSAGING_SENDER_ID`
<br>
`REACT_APP_API_MEASUREMENT_ID`
<br>

## Tools ⚒️

- Building: React, TypeScript, Styled-Components, Zustand, React Beautiful DnD, React Firebase Hooks & Firebase :sunglasses:
- Integration Tests: Jest and React Testing Library :blue_heart:
- E2E Tests: Cypress :metal:

## Demo 🎥

https://user-images.githubusercontent.com/49603590/119859711-eb6deb80-bf15-11eb-9629-dd920d99ec4f.mp4



## License :nerd_face:

Built by Tiger Abrodi under MIT license :two_hearts: 😘.
