import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getNotes() {
    const [rows] = await pool.query(`SELECT * FROM users`)
    console.log(rows, 'rows------')
    return rows
}

export async function getUser(emailid, passwd) {
    const [rows] = await pool.query(`
        select * 
        from users 
        where (emailid,passwd) = (?,?)`, [emailid, passwd]);
        console.log(rows[0],'....from getUser')
    return rows;
}




export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE userid = ? `, [id]
    )
    return rows[0]
}

/*export async function getLoginUser(emailid,passwd) {
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE (emailid,passwd) = (?,?)`, [emailid,passwd]
    )
    return rows[0]
   
}*/

export async function getLoginUser(emailid, passwd) {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM users
            WHERE emailid = ? AND passwd = ?`, [emailid, passwd]
        );

        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in getLoginUser:", error);
        throw error;
    }
}


export async function getFullname(fullname) {
    const [rows] = await pool.query(`
    SELECT count(*)
    FROM teachers
    WHERE Fullname = ? `, [fullname]
    )
    return rows[0]
}

export async function getRole(emailid) {
    const [rows] = await pool.query(`
    SELECT role
    FROM teachers
    WHERE emailid = ? `, [emailid]
    )
    return rows[0]
}

export async function createNotes(emailid, passwd, roleid, role)
 {
    const [result] = await pool.query(`
        INSERT INTO users (emailid,passwd,roleid,role)
        VALUES
        (?,?,?,?)`, [emailid,passwd,1,role])
    const id = result.insertId
    console.log(id)
    return getNote(id)
}

export async function ifPresent(emailid, passwd) {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE (emailid,passwd)= (?,?) `, [emailid, passwd]
    )
    if (rows.length > 0) {
        return true
    } else {
        return false
    }
}


/*export async function ifTeacher(emailid){
    const [rows] = await pool.query(`
    select count(*)
    from users
    where emailid=(?)` , [emailid])

if (rows>0){
    return true
}
else{
    return false
}
}*/

export async function getStudent(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM students
    WHERE studentid = ? `, [id]
    )
    return rows[0]
}

//export async function getAllStudents(fullname){
//     const [rows] = await pool.query(`
//     SELECT *
//     FROM students
//     WHERE fullname=?`, [fullname])
//     return rows[0]
// }

export async function createStudent(userid, fullname, dob, uin) {
    const [existingStudents] = await pool.query(`
    SELECT *
    FROM students
    WHERE userid = ?`, [userid]);

    if (existingStudents.length > 0) {
        // A student with the same userid already exists
        //res.status(202).send({'error':'Student already exists'});
        return null; // You can return null or an appropriate response
    }

    const [result] = await pool.query(`
            INSERT INTO students (userid,fullname,dob,uin)
            VALUES
            (?, ?, ?, ?)`, [userid, fullname, dob, uin])
    const id = result.insertId
    return getStudent(id)
}

export async function getStudents(fullname) {
    const [rows] = await pool.query(`
    SELECT *
        FROM students
        WHERE fullname=?`, [fullname])
    //console.log(rows, 'rows------')
    return rows
}

export async function register(emailid, passwd) {
    const [result] = await pool.query(`
            INSERT INTO users (emailid,passwd)
            VALUES
            (?,?)`, [emailid, passwd])
    const id = result.insertId
    return getStudent(id)
}



export async function deleteStudent() {
    const [rows] = await pool.query(`DELETE * FROM students`)
    //console.log(rows, 'rows------')
    return rows
}



/*const note = await getNotes(1)
console.log(note);*/




/*export async function getStudent(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM students
    WHERE studentid = ?`, [id]
    )
    return rows[0]
}*/


/*const note = await getNote(1)
console.log(note);*/





/*const result = await createNotes('test','test','1')
console.log(result);*/



