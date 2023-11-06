import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', {
    state: () => {
        return {
            messageList: []
        };
    },
    actions: {
        getMessageList(index) {
            return ((index || index === 0) ? this.messageList[index] : this.messageList)
        },
        setMessageList(messageList) {
            this.messageList = messageList
        },
        deleteMessage(id) {
            this.messageList = this.messageList.filter(item => item.id !== id)
        },
        getMessagesListLength() {
            return this.messageList.length
        }
    },
});

export const useManagerStore = defineStore('managerStore', {
    state: () => {
        return {
            manager: {},
            token: ''
        };
    },
    actions: {
        getManager() {
            return this.manager;
        },
        setManager(manager) {
            this.manager = manager
        },
        getToken() {
            return this.token
        },
        setToken(token) {
            this.token = token
        },
    },
});