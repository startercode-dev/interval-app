exports.getAppPage = (req, res) => {
    res.status(200).render('app');
};

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in',
    });
};
