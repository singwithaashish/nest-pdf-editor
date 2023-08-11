## TODO
**nest pdf editor** is a simple pdf editor where you can edit the form fields of a pdf file. It is written in React/Typescript on the frontend and Nest on the backend. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)




## Installation
- Clone the repo `git clone` 
- Cd into client folder `cd client`
- Install dependencies `npm install`
- Run the app `npm run dev`

- Cd into server folder `cd server` on another terminal
- Install dependencies `npm install`
- Run the app `npm run start:dev`

## Usage
- Click on 'Load PDF' to load a pdf file
- Fill up the form fields
- Click on 'Save PDF' to save the pdf file

## Folder Structure
```
client
├── public
├── src
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
└── webpack.config.js

server
├── src
│   ├── pdf
│   │   ├── entities
│   │   │   └── pdf.entity.ts
│   │   ├── pdf.controller.ts
│   │   ├── pdf.module.ts
│   │   └── pdf.service.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
└── test
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

## Screenshots
