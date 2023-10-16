import jwt from 'jsonwebtoken';
import { app, verifyToken } from './App.js';

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
