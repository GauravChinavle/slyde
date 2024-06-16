# Slyde

Slyde is a Node.js backend application that allows users to perform operations on their profiles, post statuses, follow other users, and interact with statuses through likes and comments. This project aims to provide a seamless social networking experience with real-time updates and personalized feeds.

## Features

- **User Management**: Create, read, update, and delete user profiles.
- **Status Updates**: Users can post, edit, and delete statuses.
- **Follow System**: Users can follow and unfollow other users.
- **Interactions**: Like and comment on statuses.

## Getting Started

### Prerequisites

- Node.js (>=20)
- MongoDB
- Amazon Elastic Beanstalk
- Simple Storage Service (S3)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GauravChinavle/slyde.git
   cd slyde
   
2. Install dependencies:
    ```bash
   npm install
3. Set up environment variables:
    ```bash
    PORT=
    MONGO_URL=
    SECRET_KEY=
    AWS_ACCESS_KEY=
    AWS_SECRET_KEY=
    AWS_REGION=
    AWS_BUCKET=
    AWS_KEY_ROOT=
4. Start server
   ```bash
   npm run start
   
### API Documentaion
Please check documentaion [here](https://documenter.getpostman.com/view/17368663/2sA3XQi2a1).