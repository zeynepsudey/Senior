-- tables

CREATE TABLE IF NOT EXISTS Students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT,
  lastName TEXT,
  email TEXT,
  password TEXT,
  selected_appointment_id INTEGER
);

CREATE TABLE IF NOT EXISTS Teachers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT,
  lastName TEXT,
  email TEXT,
  password TEXT,
  selected_appointment_id INTEGER
);

CREATE TABLE IF NOT EXISTS Appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  time TEXT,
  teacherId INTEGER,
  studentId INTEGER,
  FOREIGN KEY(teacherId) REFERENCES Teachers(id),
  FOREIGN KEY(studentId) REFERENCES Students(id)
);


-- student datas

INSERT INTO Students (firstName, lastName, email, password) VALUES ('Zeynep Sude', 'Yücesoy', '19030411015@ybu.edu.tr', '123456');
INSERT INTO Students (firstName, lastName, email, password) VALUES ('Sümeyye', 'Özkılıç', '19030411014@ybu.edu.tr', '123456');
INSERT INTO Students (firstName, lastName, email, password) VALUES ('Hümeyra', 'Oruç', '19030411052@ybu.edu.tr', '123456');
INSERT INTO Students (firstName, lastName, email, password) VALUES ('Ceyda', 'Taç', '19030411025@ybu.edu.tr', '123456');
INSERT INTO Students (firstName, lastName, email, password) VALUES ('Melike', 'Yeriş', '19030411035@ybu.edu.tr', '123456');


-- teacher datas

INSERT INTO Teachers (firstName, lastName, email, password) VALUES ('Derya', 'Fındık', 'dfindik@aybu.edu.tr', '123456');
INSERT INTO Teachers (firstName, lastName, email, password) VALUES ('Mazlum', 'Özçağdavul', 'mozcagdavul@aybu.edu.tr', '123456');