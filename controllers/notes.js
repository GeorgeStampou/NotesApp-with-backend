const Notes = require("../models/Notes");
const {createCustomError} = require("../errors/custom-error");


const getAllNotes = async (req,res)=>{
    try {
        const notes = await Notes.find({});
        console.log("all good");
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const createNote = async (req,res)=>{
    try {
        const note = await Notes.create(req.body);
        console.log("all good create");
        res.status(201).json({note})
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const updateNote = async (req,res, next)=>{
    try {
        const noteID = req.params.id;
        const note = await Notes.findOneAndUpdate({_id: noteID}, req.body, {
            new: true,
            runValidators: true,
        })
        if(!note){
            return next(createCustomError(`No task with id: ${noteID}`, 404));
        }
        console.log("all good with update");
        res.status(200).json({note});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const deleteNote = async (req,res, next)=>{
    try {
        const noteID = req.params.id;
        const note = await Notes.findOneAndDelete({_id: noteID});
        if(!note){
            return next(createCustomError(`No task with id: ${noteID}`, 404));
        }
        console.log("all good with delete");
        res.status(200).json({note});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote};