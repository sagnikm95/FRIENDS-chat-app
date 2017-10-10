import './MainNav.html';
Template.MainNav.events({
    'click li.logout a':()=>{
        Meteor.logout();

}
})