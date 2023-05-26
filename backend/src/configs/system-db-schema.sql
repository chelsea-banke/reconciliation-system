CREATE DATABASE reconciliation_db;

USE reconciliation_db;

CREATE TABLE PowerNetPPSales (
    ID INT AUTO_INCREMENT NOT NULL,
    Partner VARCHAR(30) NOT NULL,
    Token VARCHAR(30) NOT NULL,
    Amount NUMERIC(9, 2),
    KWH NUMERIC(9, 2),
    VendDate DATETIME NOT NULL,
    Transaction_ID INT,
    Fees NUMERIC(9, 2),
    Meter_Number VARCHAR(40),
    MSGID VARCHAR(255),
    PRIMARY KEY (ID)
) ENGINE = InnoDB;

CREATE TABLE PartnerPPSales (
    ID INT AUTO_INCREMENT NOT NULL,
    Partner_ID VARCHAR(30) NOT NULL,
    Token VARCHAR(30),
    Amount NUMERIC(9, 2),
    KWH NUMERIC(9, 2),
    VendDate DATETIME NOT NULL,
    Transaction_ID VARCHAR(40),
    Fees NUMERIC(9, 2),
    Meter_Number VARCHAR(40),
    Eneo_Account VARCHAR(40),
    PRIMARY KEY (ID)
) ENGINE = InnoDB;

CREATE TABLE Partners (
    ID INT AUTO_INCREMENT NOT NULL,
    Partner_Name VARCHAR(30) NOT NULL,
    Source VARCHAR(100) NOT NULL,
    File_Type VARCHAR(30) NOT NULL,
    Delimeter VARCHAR(30) NOT NULL,
    Partner_ID VARCHAR(30) NOT NULL,
    Token VARCHAR(30),
    Amount VARCHAR(30),
    KWH VARCHAR(30),
    VendDate VARCHAR(30) NOT NULL,
    Transaction_ID VARCHAR(30),
    Fees VARCHAR(30),
    Meter_Number VARCHAR(30),
    Eneo_Account VARCHAR(30),
    Reconcile_By VARCHAR(30),
    PRIMARY KEY (ID)
) ENGINE = InnoDB;

CREATE TABLE Exceptions (
    ID INT AUTO_INCREMENT NOT NULL,
    Type VARCHAR(30) NOT NULL,
    Reference NUMERIC(9, 2) NOT NULL,
    Status VARCHAR(30) NOT NULL,
    Partner_ID VARCHAR(30),
    Amount DECIMAL(10, 2),
    Transaction_ID VARCHAR(30),
    Meter_Number VARCHAR(30),
    Token VARCHAR(50),
    VendDate DATE,
    MsgID VARCHAR(30),
    PRIMARY KEY (ID)
) ENGINE = InnoDB;

CREATE TABLE LoadExceptionSales (
    ID INT AUTO_INCREMENT NOT NULL,
    Partner_ID VARCHAR(30),
    Token VARCHAR(30),
    Amount NUMERIC(9, 2),
    KWH NUMERIC(9, 2),
    VendDate DATETIME,
    Transaction_ID VARCHAR(40),
    Fees NUMERIC(9, 2),
    Meter_Number VARCHAR(40),
    Eneo_Account VARCHAR(40),
    MSGID VARCHAR(255),
    PRIMARY KEY (ID)
) ENGINE = InnoDB;