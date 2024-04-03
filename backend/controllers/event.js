import { google } from 'googleapis';

import dotenv from 'dotenv';
dotenv.config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEZONE Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalendar = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    
    // Delay in end time is 10 min
    let endDate = new Date(new Date(startDate).setMinutes(startDate.getMinutes() + 10));

    return {
        'start': startDate,
        'end': endDate
    }
};

// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });

        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

export const addEvent = async (req, res) => {
    const { username, email } = req.body;

    let dateTime = dateTimeForCalendar();


    // Event for Google Calendar
    let event = {
        'summary': `${username}'s Login Event`,
        'description': `${username} (${email}) has logged in at ${dateTime['start']}`,
        // 'attendees': [
        //     { 'email': email }
        // ],
        'start': {
            'dateTime': dateTime['start'],
            'timeZone': 'Asia/Kolkata'
        },
        'end': {
            'dateTime': dateTime['end'],
            'timeZone': 'Asia/Kolkata'
        }
    };

    await insertEvent(event)
        .then((response) => {
            if (response) {
                res.status(200).json({ message: "Event added successfully" });
            } else {
                res.status(400).json({ message: "Error adding event" });
            }
        })
        .catch((err) => {
            console.log(`Error at insert --> ${err}`);
            res.status(400).json({ message: "Error adding event" });
        });
}