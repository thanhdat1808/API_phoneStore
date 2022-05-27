const Iphone = require('../models/Iphone')

class IphoneController {
    getData = async (req, res, next) => {
        Iphone.find({})
            .then(iphones => {
                res.send(iphones)
            })
            .catch(next)

    }
    getDetail = async (req, res, next) => {
        const iphone = await Iphone.findOne({ _id: req.params.id })
        const views = iphone.view + 1
        Iphone
            .findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    view: views
                },
                {
                    new: true,
                    runValidators: true
                })
            .then(doc => {
                res.send(doc)
            })
            .catch(err => {
                res.send("error")
            })
    }
    async deleteProduct(req, res) {
        product.deleteOne({ _id: req.body.id }).then(() => {
            res.send("success")
        })
            .catch(err => {
                res.send("error")
            })
    }
    getDataFeatured = async (req, res, next) => {
        Iphone.find({})
            .sort({ view: -1 })
            .limit(4)
            .then(iphones => {
                res.send(iphones)
            })

            .catch(next)

    }
    async getPrice(req, res, next) {
        console.log(req.params.memory);
        Iphone.findById(req.params.id)
            .then(iphones => {
                iphones.type.forEach(element => {
                    if (element.memory == req.params.memory) res.send(element.price)
                });
            })
            .catch(next)
    }
}

module.exports = new IphoneController