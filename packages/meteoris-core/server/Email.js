Accounts.emailTemplates.siteName = "Meteoris";
Accounts.emailTemplates.from = "no-reply@meteoris.me";
Accounts.emailTemplates.enrollAccount.subject = function(user) {
    return "Password Reset Instruction, " + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.text = function(user, url) {
    var forgetPasswordUrl = url.replace("#/", "");

    return "To activate your account, simply click the link below:\n\n"
            + forgetPasswordUrl + "http://localhost/" + "\n\n"
            + "Please disregard this email if you have not requested password recovery.\n\n"
            + "Thanks, Meteoris Team";
};


Meteor.startup(function() {
    process.env.MAIL_URL = 'smtp://postmaster@sandbox44239.mailgun.org:95p6917kjti7@smtp.mailgun.org:587';
});