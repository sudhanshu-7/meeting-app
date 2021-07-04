const express = require("express")
const controller = require("../controllers/controller")


const router = express.Router()

router.get("/:url",controller.getEventById)
router.post("/",controller.createEvent)
router.patch("/:url",controller.updateEventByID)
router.delete("/:url",controller.deleteEvent)


module.exports = router