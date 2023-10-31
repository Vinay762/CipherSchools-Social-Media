const notFound = (req, res, next) => {
    const error = new Error(`Not Found :- ${req.originalUrl}`);
    res.status(404);
    next(error);
}


const errorHandler = (err, req, res, nex) => {
    let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message || "Server Error";

    res.status(statusCode).json({
        message : message,
    })
}

export {notFound, errorHandler};