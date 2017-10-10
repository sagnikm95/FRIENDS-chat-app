import "./privateChat.html";
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Chats } from '../../api/chat.js';
import { Messages } from '../../api/message.js';
Template.privateChat.helpers({
    chatText() {
        const instance = Template.instance();
        const chatID = FlowRouter.getParam('_id');
        console.log("yolo");
        console.log(chatID);
        return chatID;

    },
    messageList() {
        const chatId = FlowRouter.getParam('_id');

        return Messages.find({chatId: chatId});
    },
   friend(){
       const chatId = FlowRouter.getParam('_id');
       const part=Chats.findOne(chatId);
       if(part.part1==Meteor.userId()){
           console.log(Meteor.users.findOne(part.part2));
           return Meteor.users.findOne(part.part2);
       }
       else{
           console.log(Meteor.users.findOne(part.part1));
           return Meteor.users.findOne(part.part1);

       }


   },

    assignColor(userName) {
        const chatID = FlowRouter.getParam('_id');
        if (userName === Meteor.user().profile.userName) {
            return 'you';
        }
        else {
            return 'friend';
        }
    },


});

Template.privateChat.events({
    'submit .js-message-new'(event){
    event.preventDefault();
    const chatId = FlowRouter.getParam('_id');
    const target = event.target;

    if (!target.message.value) {
        return;
    }

    var text = target.message.value;

    console.log(chatId);
    console.log(text);

    Messages.insert({
        chatId: chatId,
        owner: Meteor.user().profile.userName,
        createdAt: new Date(),
        message: text
    });

    target.message.value = '';


}
})