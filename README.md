# Your Project Name

uno-india

## Description

Nestjs project

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

Follow these instructions to get your project up and running.

# create a database on pdadmin and strore credentials in .env

file look like:-

# -------------------------------.env----------------

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_DATABASE=uno-india
DB_SYNC=true

PAGE_SIZE=2

THROTTLE_TTL=60
THROTTLE_LIMIT=10

# JWT

JWT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9s
JWT_EXPIRE=3600

## -------------------------------------

### Installation

1. Clone the repository:

   git clone https://github.com/your-username/your-project.git

2. Navigate to the project folder:

cd uno-india

3. Install dependencies:

npm install

4. To start project --watch mode

npm run start:dev

5. swagger link

http://localhost:3000/api#/
