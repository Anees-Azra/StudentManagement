SHOW DATABASES;
USE stud;
CREATE TABLE users(
userid INT NOT NULL AUTO_INCREMENT,
emailid VARCHAR(20) NOT NULL,
passwd VARCHAR(20) NOT NULL,
role VARCHAR(10) NOT NULL,
PRIMARY KEY(userid)
);
DESCRIBE users;
SHOW TABLES;
CREATE TABLE students(33
userid INT NOT NULL AUTO_INCREMENT,
studentid VARCHAR(20) NOT NULL,
name VARCHAR(20) NOT NULL,
dob DATE NOT NULL,
uin INT NOT NULL,
PRIMARY KEY(studentid),
FOREIGN KEY(userid) REFERENCES users(userid)
);

SHOW TABLES;
DESCRIBE students;
INSERT INTO users
VALUES 
(1,'asdf@gmail.com','asdf','student');
DESCRIBE users;
SELECT * FROM users;
INSERT INTO users
VALUES 
(2,'qwert@gmail.com','qwert','student');
INSERT INTO users
VALUES 
(3,'zxcv@gmail.com','zxcv','teacher');
SELECT * FROM users;
DESCRIBE students;
INSERT INTO students
VALUES 
(1,'S001','anna','1982/02/02',123456);
SELECT * FROM students;
INSERT INTO students
VALUES 
(2,'S002','Breta','1988/04/01',123789);
SELECT * FROM students;
INSERT INTO teachers
VALUES 
(3,'T001','Jones',000123);
SELECT * FROM teachers;
DESCRIBE teachers;
UPDATE students
SET 
    name = 'Anna'
WHERE
    userid = 1;
SELECT * FROM users;
UPDATE users
SET 
    role = 'Student'
WHERE
    userid = 1;
UPDATE users
SET 
    role = 'Student'
WHERE
    userid = 2;
UPDATE users
SET 
    role = 'Teacher'
WHERE
    userid = 3;
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM teachers;
CLEAR;
CREATE TABLE students(
userid INT NOT NULL ,
studentid INT NOT NULL AUTO_INCREMENT,
name VARCHAR(20) NOT NULL,
dob DATE NOT NULL,
uin INT NOT NULL,
PRIMARY KEY(studentid),
FOREIGN KEY(userid) REFERENCES users(userid)
)
SHOW TABLES ;
CREATE TABLE teachers(
userid INT NOT NULL ,
teacherid INT NOT NULL AUTO_INCREMENT,
Fullname VARCHAR(20) NOT NULL,
uin INT NOT NULL,
PRIMARY KEY(teacherid),
FOREIGN KEY(userid) REFERENCES users(userid)
)
USE stud;
DESCRIBE users;
INSERT INTO users (emailid,passwd,perrole)
VALUES
	('qwert@gmail.com','qwert','Student'),
	('asdf@gmail.com','asdf','Student'),
    ('zxcv@gmail.com','zxcv','Teacher');

UPDATE users
SET 
    role = 'Student'
WHERE
    userid = 2;
    ALTER TABLE table_name RENAME COLUMN old_col_name TO new_col_name;
ALTER TABLE users RENAME role TO perrole;
USE stud;
DESCRIBE students;
ALTER TABLE users RENAME COLUMN role TO perrole;
SELECT * FROM students;
CREATE TABLE teachers(
userid INT NOT NULL ,
teacherid INT NOT NULL AUTO_INCREMENT,
Fullname VARCHAR(20) NOT NULL,
uin INT NOT NULL,
PRIMARY KEY(teacherid),
FOREIGN KEY(userid) REFERENCES users(userid)
)
INSERT INTO students (userid,fullname,dob,uin)
VALUES
	(1,'Anna',1983/02/2,123456),
	(2,'Breta',1986/11/03,123789);
ALTER TABLE students RENAME COLUMN name TO fullname;
INSERT INTO students (userid,fullname,dob,uin)
VALUES
(1,'Anna','1983/02/02',123456),
(2,'Breta','1986/11/03',123789);
SELECT * FROM students;
DESCRIBE students;
CREATE TABLE teachers(
userid INT NOT NULL ,
teacherid INT NOT NULL AUTO_INCREMENT,
Fullname VARCHAR(20) NOT NULL,
uin INT NOT NULL,
PRIMARY KEY(teacherid),
FOREIGN KEY(userid) REFERENCES users(userid)
)
DESCRIBE teachers;
INSERT INTO teachers (userid,fullname,uin)
VALUES
(1,'Jones',000123);
SELECT * FROM teachers;
USE stud;
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM teachers;
UPDATE users
SET 
    role = 'Student'
WHERE
    userid = 2;

DESCRIBE roles;
INSERT INTO roles
VALUES 
(1,'Student'), 
(2,'Teacher');
SELECT * FROM roles;

ALTER TABLE users 
USE stud;
ALTER TABLE users
ADD FOREIGN KEY (roleid)
REFERENCES roles(roleid)
ALTER TABLE exam
ADD FOREIGN KEY(student_id)
REFERENCES student(stude);


DESCRIBE students;
ALTER TABLE users RENAME COLUMN perrole TO roleid;
DESCRIBE users;
DESCRIBE roles;
USE stud;
ALTER TABLE users MODIFY COLUMN roleid int;
ALTER TABLE users ADD COLUMN roleid INT NOT NULL;
USE stud;
UPDATE  users SET roleid=null;
SET SQL_SAFE_UPDATES=0;
DELETE FROM users WHERE roleid='Student';
ALTER TABLE users DROP COLUMN roleid;
	
INSERT INTO users(roleid) VALUES(1);
DROP TABLE users;
SHOW TABLES;
ALTER TABLE users ADD FOREIGN KEY(roleid) REFERENCES roles(roleid);
SELECT * FROM teachers;
UPDATE  users SET roleid=2 WHERE userid =3;
DESCRIBE users;
