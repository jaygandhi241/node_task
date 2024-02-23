const express = require("express");
const router=express.Router()
const taskController=require('../../../controller/admin/taskController');
const authenticate = require('../../../middleware/auth');

// router.get("/finddata",taskController.findData);
router.get("/taskList",authenticate ,taskController.taskList);
router.get("/getTaskData",authenticate,taskController.getTaskData)
router.get("/createTaskPage",authenticate,taskController.createTaskPage)
router.post('/insertTask/:id',authenticate,taskController.insertData);
router.get("/view/:id",authenticate,taskController.viewTask);
router.post("/updatestatus/:id",authenticate,taskController.updateStatus);
router.get("/getTaskUpdatePage/:id",authenticate,taskController.getUpdateTask);
router.post("/updateTask/:id",authenticate,taskController.updateTask);
router.post("/deleteTask/:id",authenticate,taskController.deleteTask);

module.exports=router