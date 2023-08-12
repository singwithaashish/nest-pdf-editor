**nest pdf editor** is a simple pdf editor where you can edit the form fields of a pdf file. It is written in React/Typescript on the frontend and Nest on the backend. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)



## Installation
- Clone the repo `git clone` 
- Cd into server folder `cd server` on another terminal
- Install dependencies `npm install`
- Run the app `npm run start:dev`

- Cd into client folder `cd frontend`
- Install dependencies `npm install`
- Run the app `npm run start`
- Press `y` to run the app on another port



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

## Screens
![Screenshot from 2023-08-11 22-21-09](https://github.com/singwithaashish/nest-pdf-editor/assets/52033403/c484e6b0-96e5-4db1-b306-e13b149cfef8)
![Screenshot from 2023-08-11 22-20-23](https://github.com/singwithaashish/nest-pdf-editor/assets/52033403/ab92b457-8e69-4e1b-bd79-4e76da97b526)
hots
