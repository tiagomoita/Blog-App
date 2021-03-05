import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';


const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getAllBlogPosts } = useContext(Context);

    useEffect(() => {
        getAllBlogPosts();

        //serve para atualizar ou correr a funcao quando o ecra for focado(aparecer)
        const listener = navigation.addListener('didFocus', () => {
            getAllBlogPosts();
        });

        //limpar o listener, quando este componente INDEXSCREEN for removido de vez da aplicação
        return () => {
            listener.remove();
        };

    },[]);

    return (
        <View style={styles.container}>
            <FlatList
                data={state}
                keyExtractor={(blogPosts) => blogPosts.title}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Show', { id: item.id }) }}>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather name='trash' style={styles.iconStyle} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
};


IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'grey'
    },
    title: {
        fontSize: 20,
    },
    iconStyle: {
        fontSize: 24,
        alignSelf: 'center',
        marginHorizontal: 10
    }
});

export default withNavigation(IndexScreen);