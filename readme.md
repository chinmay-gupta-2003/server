# 🏅 Sporty-PHY

Sporty-PHY is a cutting-edge platform designed to address the pressing challenge of connecting sports enthusiasts within close proximity and facilitating team formation for recreational activities. Through our user-friendly interface, individuals can easily find like-minded players in their vicinity, establish connections, and form teams. The platform fosters collaboration by providing room and group functionalities, enabling team members to strategize, communicate, and organize matches.

To ensure accessibility, Sporty-PHY facilitates the discovery of available sports facilities by connecting teams with individuals who can provide spaces such as badminton courts or volleyball grounds for a nominal fee. Celebratory moments and milestones can be shared through our integrated social media feature, enhancing the sense of community.

With privacy in mind, Sporty-PHY allows users to create private rooms and groups, ensuring exclusivity for selected members through invitation-only access or unique room codes. Additionally, our platform offers a convenient marketplace for users to buy and sell sporting equipment, with Sporty-PHY facilitating secure transactions and charging a nominal 10% fee on the sale amount.

Sporty-PHY is poised to transform the landscape of recreational sports, providing a professional and seamless experience for sports enthusiasts to connect, compete, and celebrate their shared passion while prioritizing their mental and physical well-being.

## Getting Started

To start using Sporty-PHY, you will need to run backend. Follow the instructions below to set up and launch the application.

### Backend

1. Clone the repository

```
   git clone https://github.com/ImAnshuJoshi/SportyPHY-server.git
```

2. Navigate to the Backend directory:

   ```
   cd SPORTYPHY-SERVER
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory of the backend and add the following environment variables:

   ```
   DATABASE_LOCAL=
   PORT=
   JWT=
   CLOUD_NAME=
   API_KEY=
   API_SECRET=
   RAZORPAY_API_KEY=
   RAZORPAY_API_SECRET=
   EMAIL=
   PASSWORD=
   FRONTEND_URL=
   ```

   Provide the necessary values for the environment variables.

4. Start the backend server:

   ```
   npm start
   ```

   The backend server will be running on the specified port.

## The Website backend is now ready to run

# NOTE:

### After you are done cloning both client and server, you can add docker-compose.yml file as well in the root directory

```
version: '3.8'
services:
  client:
    build: ./SportyPHY-client
    container_name: clientapp_c_c
    ports:
      - "3000:3000"
    stdin_open: true
    tty: true
    env_file:
      - ./SportyPHY-client/.env
  server:
    build: ./SportyPHY-server
    container_name: serverapp_c_c
    ports:
      - "8000:8000"
    stdin_open: true
    tty: true
    env_file:
      - ./SportyPHY-server/.env
```