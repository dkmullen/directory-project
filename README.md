## Directory App
For clubs, classes, churches, etc.

I'm developing this directy app for [Coursera's Full Stack Web Development Specialization](https://www.coursera.org/specializations/full-stack) using Mongo, Express, Angular and Node.

As of June 16, 2017, it is a functional, responsive web app that allows a user to add records to and retrieve records from the database. It is also incomplete. See TODO section below.

To install, clone the repository, install the dependencies with npm, install and run [Mongo](https://www.mongodb.com/download-center?jmp=nav#community) locally and open `localhost:3000` in the browser and it should work. There is a little data (`some-data.json`) that conforms to the schema to get you started.

TODO (as of June 16, 2017)
- Login: Need separate error messages for email and pw
- Sign-up: Need checking for already-existing email addresses
- Fix date-field on forms in iOS
- Enable photo uploading
- Enable record-by-record scanning in detail-view
- Expand schema to group members by household rather than only by individual
