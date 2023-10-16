import express from 'express'
import { getNote, getNotes, createNotes, ifPresent, createStudent, getStudents, getFullname, getUser, getRole, getLoginUser } from './database.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

export const app = express()

app.use(cors())

app.use(express.json())

app.post("/posts", verifyToken, (req, res) => {
    jwt.verify(req.token,
        'a4c5476dc66a0b7960aa1f427ebe01b764177edd3efae3894200d89154033fa',
        (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {

                res.json({
                    message: 'blog posted',
                    authData: authData
                });
            }
        }
    );
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader, 'header')
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403)
    }
}


//app.use(bodyParser.urlencoded({ extended: false }))

//app.use(bodyParser.json());

app.get("/users", async (req, res) => {
    const notes = await getNotes()
    res.send({ data: notes })

})

app.post('/login', async (req, res) => {
    console.log("login route")
    //return res.send({"message": "test"})
    try {
        console.log(req.body)
        const {emailid, passwd } = req.body
        const note = await ifPresent(emailid, passwd)
        console.log(note)
        if (note) {
            const user = await getUser(emailid, passwd);
            console.log("===", user)
            const payload = 
                //"some_key" : "{{environment_variable_name}}"
                 {user}
                
            
            console.log('payload',payload)

            var token = jwt.sign(payload, "a4c5476dc66a0b7960aa1f427ebe01b764177edd3efae3894200d89154033fa", { expiresIn: '10h' })
            console.log(token)
            return res.send({"token": token})

        } else {
            res.status(406).send({ message: "Please enter details" })
        }
    } catch (note) {
        console.log(note)
        res.status(500).send({ error: "Internal Server error" })
    }
})

app.get("/loginuser", async (req, res) => {

    console.log("inside loginuser")
    console.log(req.headers.authorization)
    var bearerHeader = req.headers.authorization
    var token = bearerHeader.replace('Bearer ', '')
    console.log('token:',token)
    jwt.verify(token,
        'a4c5476dc66a0b7960aa1f427ebe01b764177edd3efae3894200d89154033fa',
        (err, decoded) => {
            if (err) {
                console.error("JWT verification error", err)
                res.sendStatus(403);
            }
            else {
                console.log(decoded)
                  return res.json({
                    //message: 'blog posted',
                    //authData: authData,
                    user : decoded.user[0]
                  });
            }
            // else{
            //     console.error("JWT decoding failed");
            //     res.sendStatus(500);
            // }
        });
})  

app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    const note = await getNote(id)
    if (note)
        res.status(201).send({ data: note })
    else
        res.status(400).send({ error: "User not registered" })
})


app.post('/adduser', async (req, res) => {
    try {
        const { emailid, passwd, roleid, role } = req.body
        const user = await getUser(emailid, passwd)

        //check if the user exits in table 
        if (user) {
            // if exits return proper error message
            res.status(202).send({ error: "user already exists" })
        }
        //if user does not exits then create
        else {
            const note = await createNotes(emailid, passwd, roleid, role)
        }

        if (note) {
            res.status(201).send(note)
        }
        else {
            res.status(202).send({ error: "User Already Entered" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ error: "Internal Server error" })
    }
});


app.post('/register', async (req, res) => {
    try {
        const { emailid, passwd, roleid, role } = req.body
        const note = await createNotes(emailid, passwd, roleid, role)
        if (note)
            res.status(201).send(note)
        else
            res.status(202).send({ error: "User Already registered" })
    } catch (note) {
        console.log("error------------", note)
        res.status(500).send({ error: "Internal Server error" })
    }
})





app.get('/role', async (req, res) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU0MDk5NDksImV4cCI6MTY5NTQ0NTk0OX0.M73zt4376C3M_P4JGauwkdnUTMg0FZDBZZ_d6qwv90o';
    const secretKey = 'a4c5476dc66a0b7960aa1f427ebe01b764177edd3efae3894200d89154033fa';
    // The secret key used to sign the JWT

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userRole = decodedToken.role;
        console.log(`User's role: ${userRole}`);
        res.json({ role: userRole });

    } catch (error) {
        console.error('Error decoding JWT:', error);
        res.status(500).json({ error: 'Error decoding JWT' });
    }
})


app.post('/addstudent', async (req, res) => {
    try {
        const { userid, fullname, dob, uin } = req.body
        const note = await createStudent(userid, fullname, dob, uin)
        if (note)
            res.status(201).send(note)
        else
            res.status(202).send({ error: "Student Already Entered" })
    } catch (error) {
        res.status(500).send({ error: "Internal Server error" })
    }
})


// app.get("/students", async (req, res) => {
//     const notes = await getStudents(fullname)
//     res.send({ data: notes })
//     console.log(notes)
app.get("/students", async (req, res) => {
    try {
        const { fullname } = req.query; // Get the fullname from request query parameters
        if (!fullname) {
            return res.status(400).send({ error: "Fullname parameter is required" });
        }

        const notes = await getStudents(fullname);
        res.send({ data: notes });
        console.log(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
})



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Sopmething broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})
