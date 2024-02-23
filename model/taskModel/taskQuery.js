const task = require("./taskSchema")

const createData=async(obj)=>{
    await task.create({
        user:obj.id ,
        title:obj.title,
        description:obj.description
    })
}

const findData = async (obj,sortObj,skip,limit) =>{
    const data = await task.find(obj).sort(sortObj).skip(skip).limit(limit).lean();
    return data;
}

const countData = async (obj) =>{
    const data = await task.find(obj).countDocuments(obj);
    return data;
}


module.exports = {
    createData,
    findData,
    countData
}

