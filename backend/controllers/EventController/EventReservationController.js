const Evenet = require("../../models/Event/Event");


//add event package
exports.addEvent = (req, res, next) => {

    const {body} = req;

    const {
        EventID,
        EventDate,
        CustomerFName,
        CustomerLName,
        CustomerEmail,
        contact,
        address,
        EventType,
        SubType,
        stages,
        description,
        amount
    } = body;

    if(new Date(EventDate) <= Date.now()){
        return res.send({
            message: 'Incorrect EventDate!'
        });
    }


    Evenet.find({
        EventID
    }).exec()
      .then(event => {

        if(event.length >= 1){
            return res.json({
                message : 'Event id already exist'
            });
        }else{

            const newevent = new Evenet();
            newevent.EventID = EventID;
            newevent.EventDate = EventDate;
            newevent.CustomerFName = CustomerFName;
            newevent.CustomerLName = CustomerLName;
            newevent.CustomerEmail = CustomerEmail;
            newevent.contact = contact;
            newevent.address = address;
            newevent.EventType = EventType;
            newevent.SubType = SubType;
            newevent.stages = stages;
            newevent.description = description;
            newevent.amount = amount;

            newevent
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Event successfully created'
                    })
                })
                .catch(err => {
                    console.log(err);
                    return res.json({
                        message: 'Please enter Email with only simple letters'
                    });
                });

        }
    });
}


//get all events
exports.getAllEvent = (req, res) => {
    Evenet.find((err, event) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(event);
        }
    });
}


//get specific event details
exports.getEvent = ((req, res) => {
    Evenet.findById(req.params.id)
    .then(event => res.json(event))
      .catch(err => res.status(400).json('Error: ' + err));
});


//edit event package
exports.editEvent = (req, res) => {
    const {body} = req;

    const {
        EventID,
        EventDate,
        CustomerFName,
        CustomerLName,
        CustomerEmail,
        contact,
        address,
        EventType,
        SubType,
        stages,
        description,
        amount
    } = body;


    Evenet.findById(req.params.id, (err, event) => {
        if (!event)
            return res.json({
                message: 'not found'
            });
        else {

            event.EventID = EventID;
            event.EventDate = EventDate;
            event.CustomerFName = CustomerFName;
            event.CustomerLName = CustomerLName;
            event.CustomerEmail = CustomerEmail;
            event.contact = contact;
            event.address = address;
            event.EventType = EventType;
            event.SubType = SubType;
            event.stages = stages;
            event.description = description;
            event.amount = amount;

            event.save().then(event => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
}


//delete event package
exports.deleteEvent = (req,res,next) => {
    Evenet.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Category deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}

