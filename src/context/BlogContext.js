import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state,
            {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }];
        case 'delete_blogpost':
            return state.filter((blogPosts) => blogPosts.id !== action.payload.id);
        case 'save_blogpost':
            return state.map((blogPosts) => {
                return blogPosts.id === action.payload.id ? action.payload : blogPosts
            });
        case 'get_blogposts':
            return action.payload;
        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title: title, content: content })

        //dispatch({ type: 'add_blogpost', payload: { title, content } });
        callback();
    }
};
const saveBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });

        dispatch({ type: 'save_blogpost', payload: { id, title, content } });
        callback();
    }
};
const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: { id } })
    }
};

const getAllBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'get_blogposts', payload: response.data })
    }
};

export const { Context, Provider } = createDataContext(
    reducer,
    { addBlogPost, deleteBlogPost, saveBlogPost, getAllBlogPosts },
    []
);