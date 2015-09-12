CREATE DATABASE chat;

USE chat;

CREATE TABLE Users (
  Id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (Id)
);

CREATE TABLE Rooms (
  Id int(11) NOT NULL AUTO_INCREMENT,
  roomname varchar(255),
  PRIMARY KEY (Id)
);

CREATE TABLE Messages (
  Id int(11) NOT NULL AUTO_INCREMENT,
  message varchar(255),
  PRIMARY KEY (Id)
);

CREATE TABLE MessagesRooms (
  M_Id int(11) NOT NULL,
  R_Id int(11) NOT NULL,
  FOREIGN KEY (M_Id) references Messages(Id),
  FOREIGN KEY (R_Id) references Rooms(Id)
);

CREATE TABLE UsersRooms (
  U_Id int(11) NOT NULL,
  R_Id int(11) NOT NULL,
  FOREIGN KEY (U_Id) references Users(Id),
  FOREIGN KEY (R_Id) references Rooms(Id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

