const task = require("../../model/taskModel/taskSchema");
const query = require("../../model/taskModel/taskQuery");
// const user = require("../../model/testing/testing");

createTaskPage=async(req,res)=>{
  try {
    const data=req.user
    res.render("pages/task/addTask", { data });
  } catch (error) {
    console.log(error.message)
  }
}

insertData = async (req, res) => {
  try {
    console.log("params",req.params)
    const obj={
      id:req.params.id,
      title:req.body.title,
      description:req.body.description
    }
    console.log("addd task")
    await query.createData(obj)
    res.redirect("/task/taskList")
    
  } catch (error) {
    console.log(error)
    res.send(error);
  }
};

findData = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const data = await query.findData({}, {}, skip, limit);
  res.send(data);
};

taskList = async (req, res) => {
 try {
   const data = req.user;
   // const empdata = await employee.find();
   res.render("pages/task/taskList", { data });
 } catch (error) {
  console.log(error.message)
 }
};

getTaskData = async (req, res) => {

  try {
    let data, regex;
    const limit = parseInt(req.query.length) || 10;
    const skip = parseInt(req.query.start) || 0;
    const searchValue = req.query.search.value.trim();
    regex = new RegExp(searchValue, "i");

    if(searchValue == ""){
      data = await query.findData({user:req?.user?._id}, {}, skip, limit);
      const recordTotal = await query.countData({user:req?.user?._id});
      res.json({ 
        data: data,
        recordsTotal: recordTotal,
        recordsFiltered: recordTotal });
  }
  else
  {
    data = await query.findData(
      { 
        user:req.user._id,
        $or: [
          { title: regex },
          { description: regex },
          { status: regex },
          
        ],
      },
      {},
      skip,
      limit
    );

    const recordTotal = data.length

    res.json({
      data: data,
      recordsTotal: recordTotal,
      recordsFiltered: recordTotal,
    });
  }
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

viewTask = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const data = await task.findById(id);
  res.render("pages/task/viewTask", { data, user});
};

updateStatus = async (req, res) => {
  const id = req.params.id;
  const data = await task.findById({_id:id});
  if (data.status == "active") {
    data.status = "inactive";
  } else {
    data.status = "active";
  }
  await data.save();
  res.json( {data});
};

getUpdateTask = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const data = await task.findById({_id:id});
  console.log("data",data)
  res.render("pages/task/updateTask", { data:data,user:user });
};


updateTask = async (req, res) => {
  try {
    console.log(req.body);

    const updatedEmployee = await task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
console.log(updatedEmployee)
    res.redirect("/task/taskList");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

deleteTask = async (req, res) => {
  await task.findByIdAndDelete({_id:req.params.id});

}






module.exports = {
  createTaskPage,
  insertData,
  findData,
  taskList,
  getTaskData,
  viewTask,
  updateStatus,
  getUpdateTask,
  updateTask,
  deleteTask,
};
