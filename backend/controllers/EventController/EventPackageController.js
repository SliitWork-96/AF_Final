const EvenetPackage = require("../../models/Event/EventPackage");
const multer = require('multer');

//add event package
exports.addEventPackage = (req, res, next) => {

    const {body} = req;

    const {
        EventPackageID,
        EventType,
        SubType,
        stages,
        description,
        images,
        PackagePrice
    } = body;


    EvenetPackage.find({
        EventPackageID
    }).exec()
      .then(package => {

        if(package.length >= 1){
            return res.json({
                message : 'Event Package already exist'
            });
        }else{

            const newPackage = new EvenetPackage();
            newPackage.EventPackageID = EventPackageID;
            newPackage.EventType = EventType;
            newPackage.SubType = SubType;
            newPackage.stages = stages;
            newPackage.description = description;
            newPackage.images = images;
            newPackage.PackagePrice = PackagePrice;

            newPackage
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Event Package successfully created'
                    })
                })
                .catch(err => {
                    console.log(err);
                });

        }
    });
}

//get all packages
exports.getAllEventPackage = (req, res) => {
    EvenetPackage.find((err, package) => {
        if(err){
            console.log(err);
        }
        else {
            res.json(package);
        }
    });
}


//get specific event package details
exports.getEventPackage = ((req, res) => {
    EvenetPackage.findById(req.params.id)
    .then(package => res.json(package))
      .catch(err => res.status(400).json('Error: ' + err));
});



//edit event package
exports.editEventPackage = (req, res) => {
    const {body} = req;

    const {
        EventPackageID,
        EventType,
        SubType,
        stages,
        description,
        images,
        PackagePrice
    } = body;

    EvenetPackage.findById(req.params.id, (err, package) => {
        if (!package)
            res.status(404).send("package is not found");
        else {
            package.EventPackageID = EventPackageID;
            package.EventType = EventType;
            package.SubType = SubType;
            package.stages = stages;
            package.description = description;
            package.images = images;
            package.PackagePrice = PackagePrice;

            package.save().then(package => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
}

//delete event package
exports.deleteEventPackage = (req,res,next) => {
    EvenetPackage.remove({_id: req.params.id})
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


//Insert Image
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

let upload = multer({ storage: storage }).single("file");


exports.UploadImage = (req, res, next) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
    
}