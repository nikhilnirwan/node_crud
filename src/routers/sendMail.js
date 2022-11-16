const nodemailer = require("nodemailer");
module.exports = {
  sendMail: () => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 3000,
      tls: true,
      auth: {
        user: "prudour.hr@gmail.com",
        pass: "bpcecapacyvtazrj",
      },
      from: `WHS@gmail.com`,
    });
    // var mailOptions = {
    //   from: "Nikhil Nirwan",
    //   to: "nniku544@gmail.com",
    //   subjec: "kjwdbgfb nbd",
    //   html: "jhdwhdf jdfdbn",
    var abc = "nniku544@gmail.com";
    var mailOptions = {
      from: "prudour.hr@gmail.com",
      to: "nniku544@gmail.com",
      subject: `[Confirmation Mail] You have Successfully applied for 
                          a Recruitment Drive!`,
      html: `Hi <b>Nikhil Nirwan</b>, <br><br>
                       Congrastulation on taking action!<br><br>
                       Your email ${abc}<br><br>
                       
                       You have successfully applied for <br><br>
                       Software Developement Engineering Recruitment Drive 
                       at "Prudour Private Limited.<br><br>
                       
                       The recruitment will be conducted on the 
                       Teligram platform.<br><br>
                       
                       You will be notified if your application is
                       approved or rejected for the Recruitment Drive
                       after a thorough evaluation.<br><br>
                       
                       Happy Up - Skilling!<br><br>
                       
                       Regards<br><br>
                       Team Prudour Pvt. Ltd.! `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail Sent", info.response);
      }
    });
  },
};
