/* eslint-disable prettier/prettier */
import { makeAutoObservable } from 'mobx';

class MessageList {
    messageList = [];

    constructor() {
        makeAutoObservable(this);
    }

    getMessageList(index) {
        return index || index === 0 ? this.messageList[index] : this.messageList;
    }
    setMessageList(messageList) {
        this.messageList = messageList;
    }
    deleteMessage(id) {
        this.messageList = this.messageList.filter(item => item.id !== id);
    }
    getMessagesListLength() {
        return this.messageList.length;
    }
}

class Manager {
    token = [];

    constructor() {
        makeAutoObservable(this);
    }

    getToken() {
        return this.token;
    }
    setToken(token) {
        this.token = token;
    }
}

export const Store = {
    messages: new MessageList(),
    manager: new Manager(),
};
