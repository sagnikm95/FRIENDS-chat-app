AccountsTemplates.addFields([
    {
        _id:'firstName',
        type:'text',
        displayName:'First Name',
        required:true,
        placeholder: {
            signUp: "Enter your first name"
        }
    },

    {
        _id:'lastName',
        type:'text',
        displayName:'Last Name',
        required:true,
        placeholder: {
            signUp: "Enter your last name"
        }
    },

    {
        _id:'userName',
        type:'text',
        displayName:'User Name',
        required:true,
        placeholder: {
            signUp: "Pick a User name"
        }
    },

]);

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,



    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',




    // Texts
    texts: {
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password"
        },
    },
});