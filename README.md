Functionalities

Authentication - Security with SHA-512 algorithm.
Multer - Library for file upload.
Prisma ERD Generator - Library for DER generation (Entity-Relationship Diagram).

Installation

inside the root folder (src) create a folder called tmp > car-images and another folder called avatars, these folders will serve to store the project images
create a file by calling .env and use the scope of .env.example to connect to the database

To install the dependencies, use one of the following commands:

- npm install
- yarn

To initialize the project, use one of the following commands:

- yarn dev
- npm run dev

Before running the migrations commands, make the connection to the database

in the SECRET_KEY section of the .env, go to https://randomkeygen.com/ and copy a password from the Fort Knox Passwords category

the database used in the project is mySQL, the project contains an .env.example
in the part corresponding to the connection with the database, the connection structure should be made as follows.
DATABASE_URL="mysql://root:password@localhost:3306/dataBaseName"

To generate the DER (Entity-Relationship Diagram), use one of the following commands:

- yarn prisma generate
- npx prisma generate

After initialized, to run the migrations use one of the following commands:

- yarn prisma migrate dev
- npx prisma migrate dev

To generate the seed with ADMIN credentials, use one of the following commands:

- yarn prisma db seed
- npx prisma db seed

note that a password will be generated in the terminal, use the email: verzel@email.com, with the password generated in the terminal to login to the dashboard
