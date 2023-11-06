import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', {
    state: () => {
        return {
            message: {},
            auditMsg: {},
            messageList: []
        };
    },
    actions: {
        getMessage() {
            return this.message;
        },
        setMessage(message) {
            this.message = message
        },
        getCheckList() {
            return this.auditMsg
        },
        setCheckList(auditMsg) {
            this.auditMsg = auditMsg
        },
        getCheckList() {
            return this.auditMsg
        },
        setCheckList(auditMsg) {
            this.auditMsg = auditMsg
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