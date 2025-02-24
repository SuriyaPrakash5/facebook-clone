import React from 'react'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { db, storage } from '../firebase'


import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { addDoc, collection, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
function InputBox() {
    const { data: session } = useSession();
    const inputRef = useRef(null);
    const filePickerRef = useRef(null);

    const [imageToPost, setImageToPost] = useState(null);

    const sendPost = (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return;
        const colRef = collection(db, "posts")
        addDoc(colRef, {
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: serverTimestamp()
        }).then((doc1) => {
            if (imageToPost) {
                const storageRef = ref(storage, `posts/${doc1.id}`)
                const uploadTask = uploadString(storageRef, imageToPost, 'data_url');

                removeImage();

                uploadTask.then
                    ((snapshot) => {
                        getDownloadURL(storageRef)
                            .then((url) => {
                                setDoc(doc(db, "posts", doc1.id), {
                                    postImage: url
                                }, { merge: true })
                            })
                    })
            }
        })
        inputRef.current.value = "";
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        };
    }

    const removeImage = () => {
        setImageToPost(null);
    };

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image
                    className="rounded-full"
                    src={session.user.image}
                    width={40}
                    height={40}
                    layout="fixed"
                />

                <form className="flex flex-1">
                    <input
                        ref={inputRef}
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text"
                        placeholder={`What's on your mind, ${session.user.name}?`}
                    />
                    <button hidden type="submit" onClick={sendPost}>
                        Submit
                    </button>
                </form>

                {imageToPost && (
                    <div
                        onClick={removeImage}
                        className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
                    >
                        <img className="h-10 object-contain" src={imageToPost} alt="" />
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}

            </div>


            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>

                <div
                    onClick={() => filePickerRef.current.click()}
                    className="inputIcon"
                >
                    <CameraIcon className="h-7 text-green-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input
                        ref={filePickerRef}
                        onChange={addImageToPost}
                        type="file"
                        hidden
                    />
                </div>

                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
