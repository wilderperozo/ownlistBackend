module.exports.add = (body, userModel) => {
    return new Promise((resolve, reject) => {
        userModel.toHash(body.password, paswecripted => {
            userModel.password = paswecripted;
            userModel.save((err, docs) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(docs)
                }
            })
        })

    })
}

