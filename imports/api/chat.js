import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');
console.log("created");