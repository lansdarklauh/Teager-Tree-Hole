/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon, Button } from '@ant-design/react-native';
import { getMessage, updateMessageLike } from '../api';

export default function ShowMessage() {
    const [message, setMessage] = React.useState({
        id: '123456',
        content: '只有在自己醒来之后才会发现自己做了一个梦',
        author: '梦游君',
        like: 16,
        state: 0,
        type: 0,
        tag: ['文学', '人生'],
        time: '2023/10/30'
    });
    const [fetch, setFetch] = React.useState(false);
    const [like, setLike] = React.useState(false);
    function getMessageInfo() {
        getMessage().then(res => {
            if (res.data.data) {
                setMessage(res.data.data);
                setFetch(true);
            } else {
                setFetch(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    function likeClick() {
        const obj = {
            id: message.id,
            like: like ? message.like - 1 : message.like + 1,
            time: message.time,
        }
        updateMessageLike(obj).then(res => {
            if (res.data.data) {
                const temp = JSON.parse(JSON.stringify(message));
                if (this.likeFlag) {
                    temp.like = Number(temp.like) - 1;
                } else {
                    temp.like = Number(temp.like) + 1;
                }
                setMessage(temp);
                setLike(!like);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    function nextMessage() {
        setLike(false);
        getMessageInfo();
    }
    function renderLike() {
        if (like && fetch) {
            return (
                <View onPress={likeClick}>
                    <Icon style={[styles.like_icon]} name="heart" size={32} color="red" />
                    <Text style={[styles.like_number_click]}>{message.like || 0}</Text>
                </View>
            );
        } else if (fetch) {
            return (
                <View onPress={likeClick}>
                    <Icon style={[styles.like_icon]} name="heart" size={32} color="black" />
                    <Text style={[styles.like_number]}>{message.like || 0}</Text>
                </View>

            );
        } else {
            return (
                <View />
            );
        }
    }
    React.useEffect(() => {
        getMessageInfo();
    }, []);
    return (
        <View style={[styles.main]}>
            <View style={[styles.navbar]}>
                <Text style={[styles.navbar_maintitle]}>Barker树洞系统</Text>
            </View>
            <Text style={[styles.title]}>树洞里的碎碎念</Text>
            <View style={[styles.message_box]}>
                <View style={[styles.message_content]}>
                    <Text style={[styles.message_text]}>{message.content}</Text>
                </View>
                <Text style={[styles.message_author]}>{message.author}</Text>
            </View>
            <Text style={[styles.message_tag]}>{message.tag ? message.tag.join('，') : ''}</Text>
            <View style={[styles.like_box]}>{renderLike()}</View>
            <Button type='primary' size='large' style={[styles.next]} onPress={nextMessage}>下一条</Button>
        </View >
    );
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
        marginHorizontal: 24,
        marginBottom: 16,
    },
    message_content: {
        height: 160,
    },
    message_text: {
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 32,
    },
    message_author: {
        marginHorizontal: 24,
        height: 64,
        textAlign: 'center',
        color: 0x005CB8,
        fontSize: 24,
        lineHeight: 32,
    },
    message_tag: {
        textAlign: 'center',
        color: 0x409EFF,
        fontSize: 16,
        lineHeight: 32,
    },
    like_box: {
        marginTop: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
    like_icon: {
        textAlign: 'center',
    },
    like_number: {
        textAlign: 'center',
        fontSize: 24,
    },
    like_number_click: {
        textAlign: 'center',
        color: 'red',
        fontSize: 24,
    },
    next: {
        alignItems: 'center',
        textAlign: 'center',
        width: 128,
        color: 0xffffff
    },
});