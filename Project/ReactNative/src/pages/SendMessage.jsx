/* eslint-disable prettier/prettier */
import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Button, TextareaItem, List, Checkbox, Switch, Toast, Provider } from '@ant-design/react-native';
import { addMessage } from '../api';
const CheckboxItem = Checkbox.CheckboxItem;

export default class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            author: '',
            type: true,
            tag1: '',
            tag2: '',
            tag3: '',
            tag4: '',
        };
    }

    onChangeContent = (val) => {
        this.setState({
            content: val,
        });
    };

    onChangeAuthor = (val) => {
        this.setState({
            author: val,
        });
    };

    getChecked = () => {
        const checked = [];
        if (this.state.tag1) {
            checked.push(this.state.tag1);
        }
        if (this.state.tag2) {
            checked.push(this.state.tag2);
        }
        if (this.state.tag3) {
            checked.push(this.state.tag3);
        }
        if (this.state.tag4) {
            checked.push(this.state.tag4);
        }
        return checked;
    }

    submitMessage = () => {
        if (this.state.content && this.state.author && this.getChecked().length) {
            const message = {
                type: this.state.type ? 1 : 0,
                tag: this.getChecked(),
                author: this.state.author,
                content: this.state.content,
            };
            addMessage(message).then(res => {
                if (res.data.data) {
                    Toast.success({
                        content: '分享成功！',
                        duration: 2,
                        stackable: true,
                    });
                    this.setState({
                        content: '',
                        author: '',
                        tag1: '',
                        tag2: '',
                        tag3: '',
                        tag4: '',
                    });
                } else {
                    Toast.fail({
                        content: '分享失败！',
                        duration: 2,
                        stackable: true,
                    });
                }
            }).catch((err) => {
                console.log(err);
                Toast.fail({
                    content: '分享失败！',
                    duration: 2,
                    stackable: true,
                });
            });
        } else {
            Toast.info({
                content: '请检查各项语句信息是否完整填写！',
                duration: 2,
                stackable: true,
            });
        }
    }

    render() {
        return (
            <Provider>
                <View style={[styles.main]}>
                    <View style={[styles.navbar]}>
                        <Text style={[styles.navbar_maintitle]}>Barker树洞系统</Text>
                    </View>
                    <Text style={[styles.title]}>倾听你的碎碎念</Text>
                    <View style={[styles.message_box]}>
                        <TextareaItem rows={6} placeholder="跟树洞倾诉你想对其他人说的东西吧" count={100} onChange={this.onChangeContent} />
                        <TextareaItem style={[styles.message_author]} rows={1} placeholder="告诉我你的名字，昵称也行" count={16} onChange={this.onChangeAuthor} />
                    </View>
                    <List style={[styles.message_tag]}>
                        <CheckboxItem
                            style={[styles.message_tagItem]}
                            checked={!!this.state.tag1}
                            onChange={(event) => {
                                this.setState({ tag1: event.target.checked ? '文学' : '' });
                            }}>
                            文学
                        </CheckboxItem>
                        <CheckboxItem
                            style={[styles.message_tagItem]}
                            checked={!!this.state.tag2}
                            onChange={(event) => {
                                this.setState({ tag2: event.target.checked ? '人生' : '' });
                            }}>
                            人生
                        </CheckboxItem>
                        <CheckboxItem
                            style={[styles.message_tagItem]}
                            checked={!!this.state.tag3}
                            onChange={(event) => {
                                this.setState({ tag3: event.target.checked ? '社会' : '' });
                            }}>
                            社会
                        </CheckboxItem>
                        <CheckboxItem
                            style={[styles.message_tagItem]}
                            checked={!!this.state.tag4}
                            onChange={(event) => {
                                this.setState({ tag4: event.target.checked ? '幽默' : '' });
                            }}>
                            幽默
                        </CheckboxItem>
                    </List>
                    <List style={[styles.message_tag]}>
                        <List.Item
                            checked
                            onChange={(checked) => {
                                this.setState({ type: checked });
                            }}
                            extra={<Switch />}>
                            是否正能量
                        </List.Item>
                    </List>
                    <Button type='primary' size='large' style={[styles.next]} onPress={this.submitMessage}>分享</Button>
                </View >
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbar: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: '100%',
        backgroundColor: 0x409EFF,
    },
    navbar_maintitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 600,
    },
    title: {
        marginTop: 36,
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 600,
        color: 0x409EFF,
    },
    message_box: {
        marginTop: 24,
        width: '86%',
        marginBottom: 8,
    },
    message_author: {
        marginTop: 6,
    },
    message_tag: {
        display: 'flex',
        width: '86%',
        marginBottom: 8,
        color: 0x409EFF,
        fontSize: 16,
        lineHeight: 32,
    },
    message_tagItem: {
        textAlign: 'center',
        color: 0x409EFF,
        fontSize: 16,
        lineHeight: 32,
    },
    next: {
        alignItems: 'center',
        textAlign: 'center',
        width: 128,
        color: 0xffffff,
    },
})