/**
 * Created by SAGNIK MONDAL on 06-10-2017.
 */
import './user-list.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Chats } from '../../api/chat.js';

Template.userlist.helpers({
        users() {
            const instance = Template.instance();
            return Meteor.users.find({_id:{$ne:Meteor.userId()}}, {sort: {createdAt: -1}});
        }
    }
);

Template.userlist.events({
    'click .user-item'(event){
    var part1=(event.currentTarget.children[0].id);
    var part2=Meteor.userId();
    console.log(part1);
    console.log(part2);
    const chat=Chats.findOne({$or:[{part1:part1,part2:part2},{part1:part2,part2:part1}]});
    var chatId;

    if(chat==undefined){
        chatId = Chats.insert({
            createdAt: new Date(),
            part1:part1,
            part2:part2

        })}
     else chatId=chat._id;


    FlowRouter.go('Private.Chat', { _id: chatId });

}
})

Template.sidepane.events({
    'click .broadcast'(event)
{
    var userID = Meteor.userId();
    FlowRouter.go('Broadcast.Chat', {_id: userID});

}
,
'click .multicast'(event)
{
    var userID = Meteor.userId();
    FlowRouter.go('Multicast.Chat', {_id: userID});
}
})

Template.sidepane.helpers({
    username(){
        const instance = Template.instance();
        return Meteor.user().profile.firstName;
    }
});