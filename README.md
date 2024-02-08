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
- Express

## Interface & Features

### Login/ Signup

Upon application launch, you will be taken to the splash page with [currently dolphins]. Navigate to the login/sign up menu by clicking on the button on the top right. Login to your account associated with the database you want to monitor. Ensure that your account is registered correctly with a username, password, and URI.

### Header and Sidebar

[...screenshot of page overview…]

The bell icon in the header will display the number of unresolved alerts from the running monitors. Clicking on the bell icon will open a drawer on the right side where you have the option to click to see anomalous rows. You can also add a note, mark alerts as resolved, and clear resolved alerts by clicking on the x.

The user silhouette icon will open up an option for Sign out so you can end your session.

The sidebar has Dashboard, ERD, Monitors, Alerts, and a settings icon for easy navigation.

### Dashboard

[... show functionality…]

### ERD

[... show functionality…]

### Monitors

[... show functionality…]

### Alerts

[... show functionality…]

## Stretch Features

- Support for other SQL databases: our current solution supports PostgreSQL databases with URIs, we would like to eventually support more database types.
- Query helper: we would like to incorporate a query helper that would assist in ensuring efficient and correct queries are being made.
- Dark mode: styling to accommodate other color schemes.
- Settings: additional settings for the app such as notification sounds.
- External alerts: sending alerts as emails or connecting to other messaging systems such as Slack.

## Contributing

We’ve released MoniQL as a valuable tool to help visualize and monitor PostgreSQL databases. Expect ongoing enhancements, extensions, and added features to be introduced to further elevate its utility. We deeply appreciate any community contributions and we invite you to explore MoniQL and offer suggestions for improvements as you see fit! If you encounter any issues, please report them in the issues tab or submit a PR. Your interest and support are greatly appreciated.

## Contributors

- Hay Nocik
- Aaron Brown
- Chris Everett
- King-Hur Wu
