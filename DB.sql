-- User tablosu
CREATE TABLE IF NOT EXISTS User (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  email TEXT,
  password TEXT,
  name TEXT,
  appointment_id INTEGER,
  FOREIGN KEY(appointment_id) REFERENCES Appointments(appointment_id)
);

-- Teachers tablosu
CREATE TABLE IF NOT EXISTS Teachers (
  teacher_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT,
  email TEXT,
  password TEXT
);

-- Teacher_Availability tablosu
CREATE TABLE IF NOT EXISTS Teacher_Availability (
  availability_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  date TEXT,
  time TEXT,
  teacher_id INTEGER,
  FOREIGN KEY(teacher_id) REFERENCES Teachers(teacher_id)
);

-- Appointments Tablosu
CREATE TABLE IF NOT EXISTS Appointments (
  appointment_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  date TEXT,
  time TEXT,
  availability_id INTEGER,
  FOREIGN KEY(availability_id) REFERENCES Teacher_Availability(availability_id)
);


-- student datas

INSERT INTO User (name, email, password) VALUES ('Zeynep Sude Yücesoy', '19030411015@aybu.edu.tr', 'Zeynep123');
INSERT INTO User (name, email, password) VALUES ('Sümeyye Özkılıç', '19030411014@aybu.edu.tr', 'Sümeyye123');
INSERT INTO User (name, email, password) VALUES ('Hümeyra Oruç', '19030411052@aybu.edu.tr', 'Hümeyra123');
INSERT INTO User (name, email, password) VALUES ('Ceyda Taç', '19030411025@aybu.edu.tr', 'Ceyda123');
INSERT INTO User (name, email, password) VALUES ('Melike Yeriş', '19030411035@aybu.edu.tr', 'Melike123');


-- teacher datas

INSERT INTO Teachers (name, email, password) VALUES ('Derya Fındık', 'dfindik@aybu.edu.tr', 'Derya123');
INSERT INTO Teachers (name, email, password) VALUES ('Mazlum Özçağdavul', 'mozcagdavul@aybu.edu.tr', 'Mazlum123');








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