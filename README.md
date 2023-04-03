# Party-Reservation-api

This project is a website application allowing company to post their events and allowing the customer user to reserve and pay for the event.

This repository contains the documentation for Reservation and Party Booking App’s back-end API of company side allowing company to post and edit their events.

The repository of front-end code for this project: https://github.com/sfdevshop/reservation-party-booking-app

#### Contents

- [Overview](#1-overview)
- [Base URL](#2-base-url)
- [How to build this application](#3-how-to-build-this-application)
- [Authentication methods](#4-authentication-methods)
- [Login](#5-login)
- [Company](#6-company)
  - [Getting all information of company user](#61-Getting-all-information-of-company-user)
  - [Updating password of company user](#62-Updating-password-of-company-user)
  - [Creating new account for company user](#63-Creating-new-account-for-company-user)
- [Event](#7-Event)
  - [Creating a new event with detailed information](#71-Creating-a-new-event-with-detailed-information)
  - [Getting all events information needed by homepage](#72-Getting-all-events'-information-needed-by-homepage)
  - [Getting detailed information of specific event](#73-Getting-detailed-information-of-specific-event)
  - [Getting all events information needed by homepage of specific company](#74-Getting-all-events'-information-needed-by-homepage-of-specific-company)
  - [Getting all events' information following same event type](#75-Getting-all-events'-information-fllowing-same-event-type)
  - [Setting available time for exist events](#76-Setting-available-time-for-exist-events)
- [Type](#8-type)

## 1. Overview

Reservation and Party Booking App’s API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs. 

## 2. Base URL

The Authentication API is served over HTTPS. All URLs referenced in the documentation have the following base: `http://localhost:4000`

## 3. How to build this application
step 1: npm install<br />
    install all packages needed to run the application<br />
step 2: npm start<br />
    running the application on port 4000 local host<br />

## 4. Authentication methods

In order to publish events on behalf of a company, you will need an access token. An access token grants access to a our database. 

The way to authenticate with this API is with an JWT Access Token in the authorization request header field(which uses the Bearer authentication schema to transmit the Access Token)

In this case, you have to send a valid Access Token in the Authorization header, using the Bearer authentication schema. An example is as follows:

GET http://localhost:4000/company/info
Authorization: 'Bearer {ACCESS_TOKEN}'

RESPONSE SAMPLE: {
    "username": "party"
}

In this scenario, you get an Access Token when you authenticate a user, and then you can make a request to the Get User Info endpoint, using the token in the Authorization header, in order to retrieve the user's profile.

## 5. Login
POST http://localhost:4000/company/login

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `username`     | string   | required   | The username we will supply you that identifies your account. |
| `password`         | string   | required   | This password will used to verify your account |

RESPONSE SAMPLE: {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpTBDG9.eyJuYW1lIjoiZXJpYyIsImlhdCI6MTY1ODIwMzkwMX0.Vp3zn3vFLOW5OV7aNhTdl5Rum5TDeMSD4ZaSJEnIk8c"
}

The following scope values are valid:

| Scope              | Description                                                             | Extended |
| -------------------| ----------------------------------------------------------------------- | -------- |
| basicProfile       | Grants basic access to a user’s profile.    | No       |
|editProfile        | Grants the ability to update the information within user's profile.     | No      |
| listEvents   | Grants the ability to list Events related to the user.            | No       |
| publishEvents        | Grants the ability to publish a event to our website.             | No       |
| uploadImage        | Grants the ability to upload an image for use within a event post.     | Yes      |

Potential Error:

| Status Code              | Status Message                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | Username missing   |
| 400 Bad Request     | Password missing   |
| 400 Bad Request     | User is not existed   |
| 401 Unauthorized       | Password is uncorrect     | 
| 500 Internal Server Error  | The server has encountered a situation it does not know how to handle           |


## 6. Company

### 6.1. Getting all information of company user

GET http://localhost:4000/company/info<br />
Authorization: 'bearer {ACCESS_TOKEN}'

RESPONSE SAMPLE: <br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "username": "hell"<br />
}

Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | Access token missing   |
| 401 Bad Request     | No access token   |
| 403 Bad Request     | Access token is wrong   |

### 6.2. Updating password of company user
PUT http://localhost:4000/company/updatepwd<br />
Authorization: 'bearer {ACCESS_TOKEN}'

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `password`         | string   | required   | This parameter should be the new password. |


Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | Access token missing   |
| 401 Bad Request     | No access token   |
| 403 Bad Request     | Access token is wrong   |


### 6.3. Creating new account for company users
POST http://localhost:4000/company/signup

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `username`     | string   | required   | The username we will supply you that identifies your account. |
| `password`         | string   | required   | This password will used to verify your account. |

Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | Username already exists.    |

## 7.Event

### 7.1. Creating a new event with detailed information
POST http://localhost:4000/event/create<br />
Authorization: 'bearer {ACCESS_TOKEN}'

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `title`         | string   | required   | The title of new event. |
| `image`         | string   | required   | The url of uploaded image of new event. |
| `num_player`         | integer   | required   | The regular number of people per event. |
| `limit_player`         | integer   | required   | The maximum people per event. |
| `regular_price`         | integer   | required   | The price for event when number of player less than regular number of people per event. |
| `additional_price`         | integer   | required   | The price for one person when number of player more than regular number of player. |
| `description`         | string   | required   | The description for new event. |
| `event_type`         | string   | required   | The type of new event. |

Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | Title missing   |
| 400 Bad Request     | Image missing   |
| 400 Bad Request     | num_player missing   |
| 400 Bad Request     | limit_player missing   |
| 400 Bad Request     | regular_price missing   |
| 400 Bad Request     | additional_price missing   |
| 400 Bad Request     | event_type missing   |
| 400 Bad Request     | description missing   |
| 400 Bad Request     | Access token missing   |
| 401 Bad Request     | No access token   |
| 403 Bad Request     | Access token is wrong   |


### 7.2. Getting all events' information needed by homepage
GET http://localhost:4000/event/all<br />

This api will send back 20 events's information one time.

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `page`     | Integer   | required   | Which page users are navigating |


RESPONSE SAMPLE: <br />
[<br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "id": 1,<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "title": "SUPER PARTY",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "image": "http://fakshdbfksaj",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "num_player": "15",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "regular_price": "260",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "additional_price": "10",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "limit_player": "20",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "description": "jalfsdjbnljdsbaljfbl",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "createdAt": "2022-07-18T23:56:27.206Z",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "updatedAt": "2022-07-19T00:25:13.162Z"<br />
}, <br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "id": 2,<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "title": "FUN PARTY",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "image": "http://fakshdbfksaj",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "num_player": "10",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "regular_price": "300",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "additional_price": "20",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "limit_player": "25",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "description": "jalfsdjbnljdsbaljfbl",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "createdAt": "2022-07-18T23:56:27.206Z",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "updatedAt": "2022-07-19T00:25:13.162Z"<br />
}<br />
,...
]<br />

### 7.3. Getting detailed information of specific event
GET http://localhost:4000/event/info

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `id`     | integer   | required   | The id of specific event stored in database |


RESPONSE SAMPLE: <br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "id": 2,<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "title": "FUN PARTY",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "image": "https://google/image/fdasjbfkawhefkhewf32",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "num_player": "10",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "regular_price": "300",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "additional_price": "20",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "limit_player": "25",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "event_type_id": "4",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "description": "2 Liters of Soda
8 arcade tokens per player
Private Party Room
Dedicated Party Host for your party
Birthday child must be turning 6 or older. All players must be a minimum of 42" tall. No Exceptions.",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "createdAt": "2022-07-18T23:56:27.206Z",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "updatedAt": "2022-07-19T00:25:13.162Z"<br />
}<br />

Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | Event id missing   |

### 7.4. Getting all events' information needed by homepage of specific company
GET http://localhost:4000/event/company/all<br />
Authorization: 'bearer {ACCESS_TOKEN}'

RESPONSE SAMPLE: <br />
[<br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "id": 1,<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "title": "SUPER PARTY",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "num_player": "15",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "regular_price": "260",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "additional_price": "10",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "limit_player": "20",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "createdAt": "2022-07-18T23:56:27.206Z",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "updatedAt": "2022-07-19T00:25:13.162Z"<br />
}, <br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "id": 2,<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "title": "FUN PARTY",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "num_player": "10",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "regular_price": "300",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "additional_price": "20",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "limit_player": "25",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "createdAt": "2022-07-18T23:56:27.206Z",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "updatedAt": "2022-07-19T00:25:13.162Z"<br />
}<br />
]<br />

Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | Access token missing   |
| 401 Bad Request     | No access token   |
| 403 Bad Request     | Access token is wrong   |

### 7.5. Getting all events' information following same event type
GET http://localhost:4000/event/type/all<br />

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `event_type`     | string   | required   | The type of events needed. |

RESPONSE SAMPLE: <br />
[<br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "id": 1,<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "title": "SUPER PARTY",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "num_player": "15",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "regular_price": "260",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "additional_price": "10",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "limit_player": "20",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "createdAt": "2022-07-18T23:56:27.206Z",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "updatedAt": "2022-07-19T00:25:13.162Z"<br />
}, <br />
{<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "id": 2,<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "title": "FUN PARTY",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "num_player": "10",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "regular_price": "300",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "additional_price": "20",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "limit_player": "25",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "createdAt": "2022-07-18T23:56:27.206Z",<br />
    &nbsp; &nbsp; &nbsp; &nbsp; "updatedAt": "2022-07-19T00:25:13.162Z"<br />
}<br />
]<br />

Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | event_type missing   |
| 400 Bad Request     | No such type   |

### 7.6. Setting available time for exist events
POST http://localhost:4000/event/create/time<br />

With the following parameters:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `id`     | integer   | required   | Event id |
| `date`     | string   | required   | Weekday |
| `time`     | string   | required   | available time |

REQUEST SAMPLE:
[<br />
{<br />
&nbsp; &nbsp; &nbsp; &nbsp; id: 2,<br />
&nbsp; &nbsp; &nbsp; &nbsp; date: "Monday",<br />
&nbsp; &nbsp; &nbsp; &nbsp; time: "10:00-20:00"<br />
},<br />
{<br />
&nbsp; &nbsp; &nbsp; &nbsp; id: 2,<br />
&nbsp; &nbsp; &nbsp; &nbsp; date: "Tuesday",<br />
&nbsp; &nbsp; &nbsp; &nbsp; time: "12:00-14:00"<br />
},<br />
{<br />
&nbsp; &nbsp; &nbsp; &nbsp; id: 2,<br />
&nbsp; &nbsp; &nbsp; &nbsp; date: "Friday",<br />
&nbsp; &nbsp; &nbsp; &nbsp; time: "12:00-14:00"<br />
}<br />
]<br />

Potential Error:

| Status Code              | Description                                                              |
| -------------------| -----------------------------------------------------------------------  |
| 400 Bad Request     | event_type missing   |
| 403 Bad Request     | You have no authentication to set available time for this event   |

## 8. Type
GET http://localhost:4000/type/all

RESPONSE SAMPLE:
[<br />
&nbsp; &nbsp;{<br />
&nbsp; &nbsp; &nbsp; &nbsp;"type": "leaser tag"<br />
&nbsp; &nbsp;}<br />
]<br />   









