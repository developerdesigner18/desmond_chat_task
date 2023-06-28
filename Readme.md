# Simple Chat using angularjs, nodejs, express and socket.io

I have created simple chat application using angular 1.6v and node 14 with express. The chat communication is done in real time using socket.io.

### Project Structure

The project is divided in two structure. First in UI section while other is backend section. Let first go through UI section.

In UI we have angular folder which have index.html for display, controller folder for logic one, bower for package dependency and styles for styling in UI. I have used Semantic UI for styling and socket.io-client package for communication to backend server.

In backend there is server.js file for all operation in backend, start server, run database and api calls. While there is chat.schema.js file for mongoose schema.

Last we have config folder which have 2 files, .env and db.js for mongoose connection.

### Challenges Faced

While we using angular 1.6 which is very old version of angular I find difficulty with packages to implement in angular.

Also I faced one more problem with communication between client and server while the socket send data in real time but It doesn't update in UI.

I find the answer through developer help website like stackoverflow and resolve all that issues. Also kinda change my node version to be work with angular.

### Steps to run project

1. Install bower in your system if you don't have

`npm i -g bower`

2. Go inside angular folder and run below command:

`bower install`

3. Go to root folder and install all dependency

`npm install`

4. To start the project

`npm start`

If you want to change port or mongo url you can change in /config/.env file.

### Live Url

http://chattest123.ap-1.evennode.com/
