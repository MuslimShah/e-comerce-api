const error = app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ msg: 'oops! something broke' })
});
module.exports = error;