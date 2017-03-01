export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

const selectSubreddit = ((subreddit) => {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
});

const invalidateSubreddit = ((subreddit) => {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
});

const requestPost = ((subreddit) => {
    return {
        type: REQUEST_POST,
        subreddit
    }
});

const receivePosts = ((subreddit, json) => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
});

const fetchPosts = ((subreddit) => {
    return dispatch => {
        dispatch(requestPost(subreddit));
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
               .then( response => response.json( ))
               .then( json => dispatch(receivePosts(subreddit, json)))
    }
});

const shouldFetchPosts = ((state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit];
    if (! posts ){
        return true;
    }
    else if( posts.isFetching ){
        return false;
    }

    return posts.didInvalidate;
});

const fetchPostsIfNeeded = ((subreddit) => {
    return (dispatch, getState) => {
        if( shouldFetchPosts(getState(), subreddit)){
            return dispatch(fetchPosts(subreddit));
        }
    }
});

export {selectSubreddit, invalidateSubreddit, fetchPostsIfNeeded};
