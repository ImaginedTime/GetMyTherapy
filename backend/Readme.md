# Backend

Backend for GetMyTherapy Assignment

## Table of Contents

- [Installation](#installation)
- [Defining environment variables](#defining-environment-variables)
- [Run the project](#run-the-project)
- [API endpoints](#api-endpoints)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ImaginedTime/GetMyTherapy.git
    ```

2. Navigate to the project directory:

    ```bash
    cd GetMyTherapy/backend
    ```

3. Install dependencies:

   ```node
   npm install
   ```

   or alternatively

   ```node
   npm i
   ```

   `Make sure to have nodejs and npm installed`

## Defining environment variables

```bash
PORT="<PORT Number>" # Port on which the server will run
MONGO_URI="<MongoDB URI>" # MongoDB URI
JWT_SECRET_KEY="<JWT Secret Key>" # JWT Secret Key
email="<Email>" # Email for sending OTP
password="<Password>" # App password for sending OTP, not the original gmail password
CALENDAR_ID="<Calendar ID>" # Calendar ID for the google calendar
CREDENTIALS="<Credentials>" # Credentials for service account of google calendar -> json file that you get after creating a service account
```


## Run the project

Use the following command to run:

```bash
npm run dev
```


## API endpoints

<table>
    <thead>
        <tr>
            <th>Route</th>
            <th>Sub route</th>
            <th>Method</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=5>/api/user</td>
            <td>/login</td>
            <td>post</td>
            <td>logging in the user</td>
        </tr>
        <tr>
            <td>/signup</td>
            <td>post</td>
            <td>signing up the user</td>
        </tr>
        <tr>
            <td>/forgot-password</td>
            <td>post</td>
            <td>sends the otp to the specified email</td>
        </tr>
        <tr>
            <td>/verify-otp</td>
            <td>post</td>
            <td>verifying the otp specified by the user</td>
        </tr>
        <tr>
            <td>/reset-password</td>
            <td>post</td>
            <td>resets the password for the given user</td>
        </tr>
        <tr>
            <td rowspan=1>/api/event</td>
            <td>/add</td>
            <td>post</td>
            <td>Adds the login event to the google calendar</td>
        </tr>
    </tbody>
</table>
