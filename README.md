# MoniQL: PostgreSQL Database Monitor and Visualiser

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Built With](#built-with)
- [Interface & Features](#interface--features)
  - [Login/ Signup](#login--signup)
  - [Header and Sidebar](#header-and-sidebar)
  - [Dashboard](#dashboard)
  - [ERD](#erd)
  - [Monitors](#monitors)
  - [Alerts](#alerts)
- [Stretch Features](#stretch-features)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

MoniQL is a mighty PostgreSQL database monitor and visualiser. Designed to simplify and automate tasks involved in taking care of a relational database, MoniQL is here to keep your database safe and happy!

## Getting Started

To get started on monitoring your database with this Project:

1. Fork and clone this repo to your local machine.
2. Run `npm install` for necessary dependencies.
3. Download and install Postgres to access MoniQL’s Postgres features.
4. Create a new remote (cloud-hosted) db instance to hold MoniQL's auth, monitors, and alerts data. (ElephantSQL)[https://www.elephantsql.com/] offers free hosting.
5. Make sure the `setup_db.sh` script is executable by running `chmod +x setup_db.sh`.
6. On the command line run `./setup_db.sh`.
7. When prompted, provide the URI to your empty database where you want to create the db.
8. Create a `.env` file in the root of your MoniQL directory and add the following line:
   - `PG_URI=<URI for your newly created DB>`
9. Create users with usernames, passwords, and URIs to the target cloud database to be monitored.

## Built With


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)  ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)  
 
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)  ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)  ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)  

- Javascript
- React
- Redux
- PostgreSQL
- Material-UI
- React-Flow
- Node-Cron
- Socket.io
- Express
- Webpack
- Love <3

## Interface & Features

### Login/ Signup

Upon application launch, you will be taken to the splash page with [currently dolphins]. Navigate to the login/sign up menu by clicking on the button on the top right. Login to your account associated with the database you want to monitor. Ensure that your account is registered correctly with a username, password, and URI.

### Header and Sidebar

The bell icon in the header will display the number of unresolved alerts from the running monitors. Clicking on the bell icon will open a drawer on the right side where you have the option to click to see anomalous rows. You can also add a note, mark alerts as resolved, and clear resolved alerts by clicking on the x.

The user silhouette icon will open up an option for Sign out so you can end your session.

The sidebar has Dashboard, ERD, Monitors, Alerts, and a settings icon for easy navigation.

### Dashboard

Upon signing in to your MoniQL account, you will be presented with our Dashboard containing dynamic charts of your alerts by the specified date range or by status and a table with information about all your monitored tables. The Dashboard’s line chart and bar chart are responsively synced up to the time range selector above them, where users can choose a specific range of dates or jump to showing all of the Alerts of the past 7, 30, 60, or 90 days. The table of tables below the charts, listing each table currently under watch from one or more MoniQL Monitors, is initially organized by the number of downstream entities that a table has. But the table of tables is interactive, too, and can be reordered by clicking on any column of the table, letting users get a quick grasp of their data’s overall health.

![Dashboard Demo Animation](https://miro.medium.com/v2/resize:fit:640/format:webp/1*FA_r3s9H_7zQmx3TqCSJiA.gif)


### Entity Relationship Diagram

The ERD icon will take you to MoniQL’s organized, interactive, and pleasingly styled Focus Table ERD where you can choose a table to focus on, and the depth of downstream tables that you will like to have displayed. This allows the user to choose any table from their database and immediately display that table’s downstream entity relationships, up to the chosen depth.

![ERD Demo Animation](https://miro.medium.com/v2/resize:fit:640/format:webp/1*g-RYLZZqvOGBaOQ2wLooqw.gif)

### Monitors

The monitors icon will take you to the engine of MoniQL’s core monitoring functionality where you can view and edit a list of your active monitors that you can filter by table name, column name, and monitor type. On the right side of the screen, you can choose a type of Monitor to create—so far we have full stack functionality for Range Monitors, Null Monitors, and Custom Monitors, and for each you can decide how often you’d like them to fire automatically, or you can fire at will with a button click. Range Monitors allow you to pick a minimum or a maximum value, or both, for any column that contains numbers, and set off an alert whenever a number outside of your chosen range is found. Our default Null Monitors look for null values in any column on a given table. And perhaps most useful to devs like yourself, our Custom Monitors allow you to enter whatever SQL query you’d like, set up to return anomalous values, and automatically check your database for such values at time intervals of your choosing. When one of your Monitors finds anomalous values on a table of yours, MoniQL will create an Alert, and update the bell icon in the upper right corner of your window. 

![Monitors Demo Animation](https://miro.medium.com/v2/resize:fit:640/format:webp/1*ym_JZoLu-0zD4orPeuWgCQ.gif)

### Alerts

The alerts icon will lead you to a closer view of your Alerts allowing you to filter by table name, column name, monitor type, and status. This will be where you have the option to click to see anomalous rows. You can also add note, mark alerts as resolved, and clear resolved alerts by clicking on the x at the top right of the Alert component. Once Alerts have been dismissed, they will no longer display by default, but you click the toggle on this page to see those you have dismissed as well as those that you haven’t gotten to yet.

![Alerts Demo Animation](https://miro.medium.com/v2/resize:fit:640/format:webp/1*SZi7OfIhOWRrzDeIk9hQqA.gif)

## Stretch Features

- Support for other SQL databases: our current solution supports PostgreSQL databases with URIs, we would like to eventually support more database types.
- Query helper: we would like to incorporate a query helper that would assist in ensuring efficient and correct queries are being made.
- Dark mode: styling to accommodate other color schemes.
- Settings: additional settings for the app such as notification sounds.
- External alerts: sending alerts as emails or connecting to other messaging systems such as Slack.

## Contributing

We’ve released MoniQL as a valuable tool to help visualize and monitor PostgreSQL databases. Expect ongoing enhancements, extensions, and added features to be introduced to further elevate its utility. We deeply appreciate any community contributions and we invite you to explore MoniQL and offer suggestions for improvements as you see fit! If you encounter any issues, please report them in the issues tab or submit a PR. Your interest and support are greatly appreciated.

## Core Team

- [Hay Nocik](https://github.com/haloxio)
- [Aaron Brown](https://github.com/aarbrn)
- [Chris Everett](https://github.com/Chris-Ever)
- [King-Hur Wu](https://github.com/amrcnking)



