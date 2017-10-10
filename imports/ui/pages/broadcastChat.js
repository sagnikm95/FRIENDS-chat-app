/**
 * Created by SAGNIK MONDAL on 09-10-2017.
 */
import './broadcastChat.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {BroadcastMessage} from '../../api/broadcastMessage.js'
import { Chats } from '../../api/chat.js';
import { Messages } from '../../api/message.js';

Template.broadcastChat.helpers({
    messageList() {
        const userId = FlowRouter.getParam('_id');
        return BroadcastMessage.find({userId: userId});
    }
})
Template.broadcastChat.events({
    'submit .js-message-new'(event){
    event.preventDefault();
    const userId= FlowRouter.getParam('_id');
    const target = event.target;

    if (!target.message.value) {
        return;
    }

    var text = target.message.value;

   ;
    console.log(text);

    BroadcastMessage.insert({
        userId: userId,
        createdAt: new Date(),
        message: text
    });



    var users=Meteor.users.find().fetch();
    for(var i=0;i<users.length;i++){
       if(users[i]._id!==Meteor.userId()){

           var chatIds=Chats.find().fetch();
           var flag=true;
           for(var j=0;j<chatIds.length;j++){
               if((chatIds[j].part1==Meteor.userId() && chatIds[j].part2==users[i]._id) || (chatIds[j].part1==users[i]._id && chatIds[j].part2==Meteor.userId())) {
                   var chatId = chatIds[j]._id;

                   Messages.insert({
                       chatId: chatId,
                       owner: Meteor.user().profile.userName,
                       createdAt: new Date(),
                       message: text
                   })
                   flag=false;
                   break;
               }
       }

           if(flag) {
               var chatId = Chats.insert({
                   createdAt: new Date(),
                   part1:Meteor.userId(),
                   part2:users[i]._id

               });

               Messages.insert({
                   chatId: chatId,
                   owner: Meteor.user().profile.userName,
                   createdAt: new Date(),
                   message: text
               });




           }


    }




    target.message.value = '';
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}
}});