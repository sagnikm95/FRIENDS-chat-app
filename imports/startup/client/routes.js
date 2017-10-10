import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import '../../ui/layouts/app-body.js';
import '../../ui/pages/privateChat.js';
import '../../ui/pages/broadcastChat.js';
import '../../ui/pages/multicastChat.js';


FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body');
    },
});

FlowRouter.route('/unicast/:_id', {
    name: 'Private.Chat',
    action() {
        BlazeLayout.render('App_body',{ main: 'privateChat' });
    },
});


FlowRouter.route('/broadcast/:_id', {
    name: 'Broadcast.Chat',
    action() {
        console.log("hello");
        BlazeLayout.render('App_body',{ main: 'broadcastChat' });
    },
});

FlowRouter.route('/multicast/:_id', {
    name: 'Multicast.Chat',
    action() {
        console.log("hello");
        BlazeLayout.render('App_body',{ main: 'multicastChat' });
    },
});