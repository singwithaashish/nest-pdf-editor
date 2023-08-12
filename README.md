**nest pdf editor** is a simple pdf editor where you can edit the form fields of a pdf file. It is written in React/Typescript on the frontend and Nest on the backend. 


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)



## Installation
- Clone the repo `git clone https://github.com/singwithaashish/nest-pdf-editor/` 
- Cd into server folder `cd server`
- Create a new `.env` file and put your postgres url as `DATABASE_URL`
- Install dependencies `npm install`
- Run the app `npm run start:dev`

- Cd into client folder `cd frontend` on another terminal
- Install dependencies `npm install`
- Run the app `npm run start`
- Press `y` to run the app on another port



## Usage
- Click on 'Load PDF' to load a pdf file
- Fill up the form fields
- Click on 'Save PDF' to save the pdf file

## Folder Structure
```
frontend
├── public
└── src
    ├── App.js
    └── index.js

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
UPDATED IMPLEMENTATION:
![Screenshot from 2023-08-12 16-53-43](https://github.com/singwithaashish/nest-pdf-editor/assets/52033403/94200054-89e9-45af-a736-94e2fae585c7)
![Screenshot from 2023-08-12 16-53-35](https://github.com/singwithaashish/nest-pdf-editor/assets/52033403/09b20439-b974-40eb-a3f3-829a743e71c2)
![Screenshot from 2023-08-12 16-53-53](https://github.com/singwithaashish/nest-pdf-editor/assets/52033403/dfeb0b09-53bd-4458-87f4-f8a87fdb4c36)




PREVIOUS IMPLEMENTATION:

![Screenshot from 2023-08-11 22-21-09](https://github.com/singwithaashish/nest-pdf-editor/assets/52033403/c484e6b0-96e5-4db1-b306-e13b149cfef8)
![Screenshot from 2023-08-11 22-20-23](https://github.com/singwithaashish/nest-pdf-editor/assets/52033403/ab92b457-8e69-4e1b-bd79-4e76da97b526)
hots
