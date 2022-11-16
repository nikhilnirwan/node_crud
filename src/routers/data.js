// const { response } = require('express');
const express = require("express");
const router = new express.Router();
const sendMaile = require("./sendMail");
const nodemailer = require("nodemailer");
const _ = require("lodash");

const MensRanking = require("../models/mens");

// send email api

router.post("/sendmail", async (req, res) => {
  try {
    const email = sendMaile.sendMail();
    var number = Math.floor(Math.random() * 1000000) + 1;
    console.log(number);

    res.status(201).send(email);
  } catch (e) {
    res.send(e);
  }
});

//post data asyncronus
router.post("/add", async (req, res) => {
  try {
    const addingMensRecords = new MensRanking(req.body);
    console.log(req.body);
    const insertMean = await addingMensRecords.save();
    res.status(201).send(insertMean);
  } catch (e) {
    res.send(e);
  }
});

//get all by asyncronus
// for each loop use
Array1 = [];
router.get("/getALL", async (req, res) => {
  try {
    const getMens = await MensRanking.find({}).sort({ ranking: 1 });
    getMens.forEach((element) => {
      const total = element.score;
      Array1.push(total);
      // console.log(total);
    });
    const add = _.sum(Array1);
    console.log(add);
    res.send(getMens);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get by id asyncronus
router.get("/get/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getIndivisual = await MensRanking.findById(_id);
    res.send(getIndivisual);
  } catch (e) {
    res.status(400).send(e);
  }
});

//update by id asyncronus
router.patch("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getUpdate = await MensRanking.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(getUpdate);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update data by promises
router.put("/update/:id", function (req, res) {
  return new Promise(function (resolve, reject) {
    MensRanking.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((data) => {
        resolve(res.send(`update data successfully ${data}`));
      })
      .catch((err) => {
        reject(res.send(err));
      });
  });
});

// paramas new method

// //delete data from data base asyncronus
router.delete("/delete/:id", async (req, res) => {
  try {
    //const _id = req.params.id; short use kiya hay
    const getDelete = await MensRanking.findByIdAndDelete(req.params.id);
    res.send(getDelete);
  } catch (err) {
    res.status(500).send(err);
  }
});

//deleteALL data asyncronus
router.delete("/deleteALL", async (req, res) => {
  try {
    const deleteALL = await MensRanking.remove({});
    res.send("delete all data successfully");
  } catch (err) {
    res.send(err);
  }
});

//********************** */ promises api ////****************

// //// promise add method
// router.post('/add', function(req, res) {
// 	return new Promise(function(resolve, reject) {
// 		const addData = new MensRanking(req.body)
// 			.save()
// 			.then((data) => {
// 				resolve(res.send(`data add successfully${data}`));
// 			})
// 			.catch(() => {
// 				reject(res.send('Unsuccessfull'));
// 			});
// 	});
// });

// ////promises get by all
// router.get('/getALL', function(req, res) {
// 	return new Promise(function(resolve, reject) {
// 		const result = MensRanking.find({}).then((data) => {
// 			resolve(res.send(`getALLdata${data}`)).catch((err) => {
// 				reject(res.send(err));
// 			});
// 		});
// 	});
// });

// //// get by id promise
// router.get('/get/:id', function(req, res) {
// 	return new Promise(function(resolve, reject) {
// 		const result = MensRanking.findById(req.params.id)
// 			.then((data) => {
// 				resolve(res.send(`get data by id ${data}`));
// 			})
// 			.catch((err) => {
// 				reject(res.send(err));
// 			});
// 	});
// });

// router.patch('/update/:id', (req, res) => {
// 	const data = MensRanking.findByIdAndUpdate({ _id: req.params.id }, req.body)
// 		.then((data) => {
// 			res.send(data);
// 		})
// 		.catch((error) => {
// 			res.send(error);
// 		});
// });

// //// delete data by promises

// router.delete('/delete/:id', function(req, res) {
// 	return new Promise(function(resolve, reject) {
// 		MensRanking.findByIdAndDelete(req.params.id)
// 			.then((data) => {
// 				resolve(res.send(`update data successfully ${data}`));
// 			})
// 			.catch((err) => {
// 				reject(res.send(err));
// 			});
// 	});
// });

// router.delete('/deleteALL', function(req, res) {
// 	return new Promise(function(resolve, reject) {
// 		MensRanking.remove({})
// 			.then((data) => {
// 				resolve(res.send(`update data successfully ${data}`));
// 			})
// 			.catch((err) => {
// 				reject(res.send(err));
// 			});
// 	});
// });

module.exports = router;
