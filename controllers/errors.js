exports.getNotFoundPage = (req,res, next) => {
    res.status('404').render('stubs/404', {pageTitle: "Page is not found"});
}