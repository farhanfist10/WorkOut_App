const Workout = require("../models/workModel");
const mongoose=require('mongoose');

const getWorkOuts=async(req,res)=>{
  const user_id = req.user._id;
    const works = await Workout.find({user_id}).sort({ createdAt: -1 });
    res.send(works);
}

const getWorkOut=async(req,res)=>{
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
}

const creatWorkOut= async(req,res)=>{
    const { title, load, reps } = req.body;
    let emptyFields=[]

    if (!title) {
      emptyFields.push("title");
    }
    if (!load) {
      emptyFields.push("load");
    }
    if (!reps) {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }
    
    try {
      const user_id=req.user._id;
      const works = await Workout.create({ title, load, reps ,user_id});
      res.send(works);
    } catch (err) {
      res.send("Failed");
    }
}

const updateWorkOut=async(req,res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const works=await Workout.findByIdAndUpdate({_id:id},{...req.body});

    if (!works) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(works);
}

const deleteWorkOut=async(req,res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const works=await Workout.findByIdAndDelete({_id:id});

    if (!works) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(works);
}

module.exports = {
  getWorkOuts,
  getWorkOut,
  creatWorkOut,
  updateWorkOut,
  deleteWorkOut,
};