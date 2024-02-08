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
4. Create an `.env` file on your local machine.
5. Create your auth db.
6. Make sure the `setup_db.sh` script is executable by running `chmod +x setup_db.sh`.
7. On the command line run `./setup_db.sh`.
8. When prompted, provide the URI to your empty database where you want to create the db.
9. Create a `.env` file in your root and add the following line:
   - `PG_URI=<URI for your newly created DB>`
10. Create users with usernames, passwords, and URIs to the cloud database to be monitored.

## Built With

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

[...screenshot of page overview…]

The bell icon in the header will display the number of unresolved alerts from the running monitors. Clicking on the bell icon will open a drawer on the right side where you have the option to click to see anomalous rows. You can also add a note, mark alerts as resolved, and clear resolved alerts by clicking on the x.

The user silhouette icon will open up an option for Sign out so you can end your session.

The sidebar has Dashboard, ERD, Monitors, Alerts, and a settings icon for easy navigation.

### Dashboard

Upon signing in to your MoniQL account, you will be presented with our Dashboard containing dynamic charts of your alerts by the specified date range or by status and a table with information about all your monitored tables. The Dashboard’s line chart and bar chart are responsively synced up to the time range selector above them, where users can choose a specific range of dates or jump to showing all of the Alerts of the past 7, 30, 60, or 90 days. The table of tables below the charts, listing each table currently under watch from one or more MoniQL Monitors, is initially organized by the number of downstream entities that a table has. But the table of tables is interactive, too, and can be reordered by clicking on any column of the table, letting users get a quick grasp of their data’s overall health.

[... show functionality…]

### Entity Relationship Diagram

The ERD icon will take you to MoniQL’s organized, interactive, and pleasingly styled Focus Table ERD where you can choose a table to focus on, and the depth of downstream tables that you will like to have displayed. This allows the user to choose any table from their database and immediately display that table’s downstream entity relationships, up to the chosen depth.
[... show functionality…]

### Monitors

The monitors icon will take you to the engine of MoniQL’s core monitoring functionality where you can view and edit a list of your active monitors that you can filter by table name, column name, and monitor type. On the right side of the screen, you can choose a type of Monitor to create—so far we have full stack functionality for Range Monitors, Null Monitors, and Custom Monitors, and for each you can decide how often you’d like them to fire automatically, or you can fire at will with a button click. Range Monitors allow you to pick a minimum or a maximum value, or both, for any column that contains numbers, and set off an alert whenever a number outside of your chosen range is found. Our default Null Monitors look for null values in any column on a given table. And perhaps most useful to devs like yourself, our Custom Monitors allow you to enter whatever SQL query you’d like, set up to return anomalous values, and automatically check your database for such values at time intervals of your choosing. When one of your Monitors finds anomalous values on a table of yours, MoniQL will create an Alert, and update the bell icon in the upper right corner of your window. 

[... show functionality…]

### Alerts

The alerts icon will lead you to a closer view of your Alerts allowing you to filter by table name, column name, monitor type, and status. This will be where you have the option to click to see anomalous rows. You can also add note, mark alerts as resolved, and clear resolved alerts by clicking on the x at the top right of the Alert component. Once Alerts have been dismissed, they will no longer display by default, but you click the toggle on this page to see those you have dismissed as well as those that you haven’t gotten to yet.

[... show functionality…]

## Stretch Features

- Support for other SQL databases: our current solution supports PostgreSQL databases with URIs, we would like to eventually support more database types.
- Query helper: we would like to incorporate a query helper that would assist in ensuring efficient and correct queries are being made.
- Dark mode: styling to accommodate other color schemes.
- Settings: additional settings for the app such as notification sounds.
- External alerts: sending alerts as emails or connecting to other messaging systems such as Slack.

## Contributing

We’ve released MoniQL as a valuable tool to help visualize and monitor PostgreSQL databases. Expect ongoing enhancements, extensions, and added features to be introduced to further elevate its utility. We deeply appreciate any community contributions and we invite you to explore MoniQL and offer suggestions for improvements as you see fit! If you encounter any issues, please report them in the issues tab or submit a PR. Your interest and support are greatly appreciated.

## Core Team

- Hay Nocik
- Aaron Brown
- Chris Everett
- King-Hur Wu
