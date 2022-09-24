import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { IUser } from "../types";

const UserProfile = ({
  user,
  width,
  height,
}: {
  user: IUser;
  width: number;
  height: number;
}) => {
  return (
    <Link href={`/profile/${user._id}`}>
      <div className="flex gap-3 items-start">
        <div className="w-8 h-8">
          <Image
            src={user.image}
            width={width}
            height={height}
            className="rounded-full "
            alt="user profile"
            layout="responsive"
          ></Image>
        </div>
        <div>
          <div>
            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
              {user.userName.replaceAll(" ", "")}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserProfile;
