const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us12.api.mailchimp.com/3.0/lists/bab6eb1c11",
        method: "post",
        headers: {
            "Authorization": "pranjul ef8ba6f46a17687abe83d293d5cd4d63-us12"
        },
        body: jsonData
    };

    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failre.html");
        }
        else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/succes.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {

    console.log("The servr has started on port 3000");
});

// ef8ba6f46a17687abe83d293d5cd4d63-us12

// bab6eb1c11
