import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, inputOptions } from '../constants/styles';
import { TextInput } from 'react-native-paper';
import axios from 'axios';

const ChatBot = ({ setChatVisible, visible }) => {
    const [query, setQuery] = useState('');
    const [chat, setChat] = useState([]);

    const handleQuerySubmit = async () => {
        try {
            const apiUrl = 'http://192.168.163.68:5000/chat';

            const requestData = {
                message: query,
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const responseData = response.data;
                setChat((prevChat) => [
                    ...prevChat,
                    { text: query, role: 'user' },
                    { text: responseData.response, role: 'chatbot' },
                ]);
                setQuery('');
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={() => setChatVisible(!visible)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.textColor,
                }}
            >
                <Text
                    style={{
                        color: colors.textColor,
                        fontSize: 18,
                    }}
                >X
                </Text>
            </TouchableOpacity>
            <ScrollView
                style={{
                    backgroundColor: colors.headingColor,
                }}
                contentContainerStyle={{
                    backgroundColor: colors.headingColor,
                    justifyContent: 'space-between',
                    padding: 20,
                    flex: 2
                }}
            >
                <View>
                    {chat.map((message, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent:
                                    message.role === 'user' ? 'flex-end' : 'flex-start',
                                padding: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        message.role === 'user'
                                            ? colors.backgroundColor
                                            : colors.textColor,
                                    backgroundColor:
                                        message.role === 'user'
                                            ? colors.mainColor
                                            : colors.secondaryColor,
                                    padding: 10,
                                    borderRadius: 10,
                                    // maxWidth: '10%',
                                }}
                            >
                                {message.text}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TextInput
                placeholder={'Enter your query'}
                {...inputOptions}
                value={query}
                onChangeText={(text) => setQuery(text)}
                onSubmitEditing={handleQuerySubmit}
                style={{}}
            />
        </View>
    );
};

export default ChatBot;

const styles = StyleSheet.create({});
