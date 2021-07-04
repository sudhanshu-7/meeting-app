const Event = require("../model/event")


const getEventById = async (req,res,next)=>{
    let events;
    try{
        events = await Event.find({email:req.params.url})
    }catch(err){
        return next("Failed To Load Calendar")
    }
    if(!events || events.length === 0){
        return next("No Meetings Found")
    }
    res.json({events : events.map(event=>event.toObject({getters:true}))})
}
const updateEventByID = async (req,res,next)=>{
    const {description,start,end,title,email} = req.body
    const id = req.params.url
    let event;
    try{
        event = await Event.findById(id)
    }catch(err){
        return next("Unable to Connect to DB")
    }
    if(!event){
        return next("Cannot Find");
    }
    event.email = email
    event.description = description
    event.start = start
    event.end = end
    event.title = title

    try{
        await event.save();
    }catch(err){
        return next("Unable to access")
    }
    res.status(200).json({
        message:"Updated Successfully"
    })

}
const createEvent = async (req,res,next)=>{
    const {email,description,start,title,end} = req.body
    const event = new Event({
        email,description,start,title,end
    })
    try{
        await  event.save()
    }catch(err){
        return next(err)
    }
    res.status(201).json({event})
}
const deleteEvent = async (req,res,next)=>{
    const id = req.params.url
    let event;
    try{
        event = await Event.findById(id)
    }catch(err){
        return next("Can Not Find the ID")
    }
    try{
        await event.remove()
    }catch(err){
        return next("Unable To Delete")
    }
    res.status(200).json({message:"Deleted!"})
}
exports.deleteEvent = deleteEvent
exports.updateEventByID = updateEventByID
exports.getEventById = getEventById
exports.createEvent = createEvent