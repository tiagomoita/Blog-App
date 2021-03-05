import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));
    const { saveBlogPost } = useContext(Context);

    initialState = {
        title: blogPost.title,
        content: blogPost.content
    }

    return (
        <View>
             <BlogPostForm initialState={initialState} onSubmit={(title, content) => {
                saveBlogPost(blogPost.id ,title, content, () => { navigation.pop() })
            }} />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default EditScreen;