/**
 * Created by SAGNIK MONDAL on 09-10-2017.
 */
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {BroadcastMessage} from '../../api/broadcastMessage.js'
import { Chats } from '../../api/chat.js';
import { Messages } from '../../api/message.js';

import './multicastChat.html';
Template.multicastChat.onCreated(function(){
    this.group=new ReactiveVar([])
    this.cnt=new ReactiveVar(0);
})

Template.multicastChat.events({
    'click .user-item' (event){

    var selected=(event.currentTarget.parentNode.id);
    var arr=Template.instance().group.get();
    var i=0;
    var flag=true;
    for(;i<arr.length;i++){

        if(arr[i]==selected){
            console.log(arr[i]);
            arr.splice(i,1);
            flag=false;
            break;
        }
    }

    console.log(i);
    if(flag)
    arr.push(selected);;

        Template.instance().group.set(arr);

    },

'submit .js-message-new'(event){
    event.preventDefault();
    var users=Template.instance().group.get();
    const target = event.target;

    if (!target.message.value) {
        return;
    }

    var text = target.message.value;
    for(var i=0;i<users.length;i++) {
        if (users[i] !== Meteor.userId()) {

            var chatIds = Chats.find().fetch();
            var flag = true;
            for (var j = 0; j < chatIds.length; j++) {
                if ((chatIds[j].part1 == Meteor.userId() && chatIds[j].part2 == users[i]) || (chatIds[j].part1 == users[i] && chatIds[j].part2 == Meteor.userId())) {
                    var chatId = chatIds[j]._id;

                    Messages.insert({
                        chatId: chatId,
                        owner: Meteor.user().profile.userName,
                        createdAt: new Date(),
                        message: text
                    })
                    flag = false;
                    break;
                }
            }

            if (flag) {
                var chatId = Chats.insert({
                    createdAt: new Date(),
                    part1: Meteor.userId(),
                    part2: users[i]

                });

                Messages.insert({
                    chatId: chatId,
                    owner: Meteor.user().profile.userName,
                    createdAt: new Date(),
                    message: text
                });


            }
        }
    }
    target.message.value = '';
    Template.instance().group.set([]);
}
})

Template.multicastChat.helpers({
    users() {
        const instance = Template.instance();
        return Meteor.users.find({_id:{$ne:Meteor.userId()}}, {sort: {createdAt: -1}});
    },
    assignSelected(userId) {
        var arr=Template.instance().group.get();
        for(var i=0;i<arr.length;i++){
            if(arr[i]==userId)
            return 'selected';
        }
        return 'notSelected';
    }
})