
import { collection, orderBy, query } from 'firebase/firestore';
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Post from './Post'

function Posts() {

    const [realtimePosts, loading, error] = useCollection(
        query(collection(db, "posts"), orderBy("timestamp", "desc"))
    )



    return (
        <div>
            {realtimePosts?.docs.map((post) => (
                <Post
                    key={post.id}
                    name={post.data().name}
                    message={post.data().message}
                    email={post.data().email}
                    timestamp={post.data().timestamp}
                    image={post.data().image}
                    postImage={post.data().postImage}
                />
            ))
            }
        </div>
    )
}

export default Posts
