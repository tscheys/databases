CREATE DATABASE chat;

USE chat;

CREATE TABLE Users (
  userId int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (userId)
);

CREATE TABLE Rooms (
  roomId int(11) NOT NULL AUTO_INCREMENT,
  roomname varchar(255),
  PRIMARY KEY (roomId)
);

CREATE TABLE Messages (
  messageId int(11) NOT NULL AUTO_INCREMENT,
  message varchar(255),
  userId int(11),
  PRIMARY KEY (messageId),
  FOREIGN KEY (userId) REFERENCES Users(userId)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

