import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

const PostDetail = ({ postDetails }: IProps) => {
  //post state is use to change details about the post when needed
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  
  const { userProfile }: any = useAuthStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  /* like button functionality (which post, by who)*/
  
  const onLike = async (like: boolean) => {
    //if have a user
    if (userProfile) {
      //whenever we want to update smth we use the PUT request/api call
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      //whenever we want to set objects, open new object then spread previous state of the post and select the property we want to update.
      setPost({ ...post, likes: data.likes });
    }
  };

  
  /* add comments to the post (which post, by who)*/

  const addComment = async (e : any) => {
    e.preventDefault(); //prevent reload after upload comment.
    if (userProfile && comment) { 
      setIsPostingComment(true);
      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({ ...post, comments: data.comments });
      setComment('');
      setIsPostingComment(false);
    }

  }

  /* video functions play-pause-mute */

  const onVideoClick = () => {
    if (!playing) {
      videoRef?.current?.play();
      setPlaying(true);
    } else {
      videoRef?.current?.pause();
      setPlaying(false);
    }
  };

  //call useEffect hook only when isVideoMuted state variable value changes.
  useEffect(() => {
    //if we have a valid video selected
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  //if video post doesn't exist.
  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      {/* (left side) video section with play/pause & mute button */}
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px] cursor-pointer" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              onClick={onVideoClick}
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%]">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      {/* (right side) comment section,caption and like button  */}
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-15 mt-10">
          {/* user profile */}
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            {/* user profile image */}
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile shoot"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              {/* user name */}
              <Link href="/">
                <div className="mt-2 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName} {` `}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          {/* caption */}
          <p className="mt-4 px-9 text-lg text-gray-600">{post.caption}</p>
          {/* Like button functionality */}
          <div className="mt-7 px-6">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => onLike(true)}
                handleDislike={() => onLike(false)}
              />
            )}
          </div>
          <Comments
            //passing states and functions as props.
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

//make a API call for fetching the data of a specific video post
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  //since /api/post/[id] is a dynamic route the matched path parameter will be sent as a query to the page (in this case to the API endpoint)
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default PostDetail;