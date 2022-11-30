const nodemailer = require('nodemailer');
 
 
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "ziadayman9901@gmail.com",
        pass: "lwnociqszlkncnuu"
    }
  });
  transporter.verify().then(console.log).catch(console.error);
 
let mailDetails = {
    from: 'ziadayman9901@gmail.com',
    to: 'zoz200112300@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
 
transporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});