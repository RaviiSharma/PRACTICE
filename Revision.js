

// INDEX FILE (MULTER , JWT TOKEN , password encryption(BCRYPT),AWS S3 BUCKET,MIDDLEWARE (authentication,authorization),AXIOS CALL, dependecies


//index.js _ (MULTER)_______________________________________________________________________

const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const route = require('../src/routes/route')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().any())

mongoose.connect("mongodb+srv://RaviKumarSharma:i6tpVmiNCvIQSjH6@cluster0.pnzdn4a.mongodb.net/group-35-Database",{
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)

app.listen(process.env.PORT || 3000 , function () {
    console.log('Express app running on port' + (process.env.PORT || 3000 ))
});

//___JWT TOKEN ______________________________________________________________________________________

const token = require('jwt')
let token = jwt.sign(
    {
        authorId: Author._id.toString(),
        batch: "Plutonium"
        
    },
    "Project-1"
);
res.status(201).send({ status: true, data: token });



 //____ password encryption using(BCRYPT)_________________________________________________________________

 const salt = await bcrypt.genSalt(13);
 const encryptedPassword = await bcrypt.hash(password, salt);

 // comparing hashed password and login password
 const isPasswordMatching = await bcrypt.compare(
    password,
    userDetails.password
);

if (!isPasswordMatching) {
    return res
        .status(400)
        .send({ status: false, message: "incorrect password" });
}

//________AWS S3 BUCKET_____________________________________________________________

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

const uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        const s3 = new AWS.S3({ appVersion: '2006-03-01' })

        const uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "abc-aws/" + file.originalname,
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {

            if (err) {
                return reject({ error: err })
            }

            console.log(" file uploaded succesfully ")
            return resolve(data.Location)
        });
    });
}

module.exports = { uploadFile }

//_____MIDDLEWARE (authentication, authorization) ____________________________________________________________________

const jwt = require('jsonwebtoken');

const authentication = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']

        if (!token) {
            return res.status(401).send({ status: false, message: "neccessary header token is missing" })
        }
        
         jwt.verify(token, "Project-1", (err, author)=> {
            if(err){ return res.status(403).send("failed authentication")}
            req.authorLoggedIn = author
        })
        next()
         
    }catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.authentication = authentication

//________AXIOS CALL , PINCODE AND CITY____________________________________________________
const axios = require("axios");

//Matching pincode and city by axios call
const options = {
    method: "GET",
    url: `https://api.postalpincode.in/pincode/${pincode}`,
};

const pincodeDetail = await axios(options);

if (pincodeDetail.data[0].PostOffice === null) {
    return res
        .status(400)
        .send({status: false,message: "Shipping address: pin code should be valid"});
}

const cityNameByPinCode = pincodeDetail.data[0].PostOffice[0].District;

address.shipping.city = cityNameByPinCode;


//____dependencies____________________npm i , npm install ______

// "dependencies": {
//     "aws-sdk": "^2.1231.0",
//     "axios": "^1.1.2",
//     "bcrypt": "^5.1.0",
//     "body-parser": "^1.20.1",
//     "currency-symbol-map": "^5.1.0",
//     "easy-currencies": "^1.7.0",
//     "express": "^4.18.2",
//     "jsonwebtoken": "^8.5.1",
//     "mongoose": "^6.6.5",
//     "multer": "^1.4.5-lts.1",
//     "nodemon": "^2.0.20"
//   }

