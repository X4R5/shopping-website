function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({message: "You are not authorized to access this resource"});
    }

    if (err.name === 'ValidationError') {
        res.status(401).json({message: err});
    }

    return res.status(500).json(err);
}

module.exports = errorHandler;