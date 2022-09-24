//useRef hook for video's play, pause, mute
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard = ({ post }: IProps) => {

  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); //allow us to manipulate with that video element using this videoRef

  const onVideoPress = () => { 
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else { 
      videoRef?.current?.play();
      setPlaying(true);
    }
  }

  //call useEffect hook only when isVideoMuted state variable value changes.
  useEffect(() => {
    //if we have a valid video selected
    if (videoRef?.current) {  
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted])
  

  return (
    // user 
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          {/* user profile image */}
          <div className="md:w-16 md:h-16 w-10 h-11">
            <Link href={`/profile/${post.postedBy._id}`}>
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
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="md:pt-2 pt-1 flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* user posted video */}
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              src={post.video.asset.url}
              ref={videoRef}
              className="lg:w-[600px] lg:h-[530px] md:h-[400px] h-[300px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>
          {/* buttons play and mute */}
          {isHover && (
            <div className="absolute cursor-pointer bottom-6 left-10 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)} >
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
