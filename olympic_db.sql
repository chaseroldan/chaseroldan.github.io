DROP TABLE olympics;


CREATE TABLE olympics (
  ID INT,
  Name VARCHAR(100) NOT NULL,
  Sex VARCHAR(100) NOT NULL,
  Age Float NOT NULL,
  Height Float NOT NULL,
  Weight Float NOT NULL,
  Team VARCHAR(100) NOT NULL,
  NOC VARCHAR(100) NOT NULL,
  Games VARCHAR(100) NOT NULL,
  Year INT,
  Season VARCHAR(100) NOT NULL,
  City VARCHAR(100) NOT NULL,
  Sport VARCHAR(100) NOT NULL,
  Event VARCHAR(100) NOT NULL,
  Medal VARCHAR(100) NOT NULL
);


SELECT *
FROM olympics;

SELECT name, team, year, event, medal
FROM olympics
WHERE team = 'United States'
AND year = 2016
AND sex = 'M';

SELECT *
FROM olympics;

SELECT name, team, year, event, medal
FROM olympics
WHERE team = 'United States'
AND year = 2016
AND sex = 'F';

