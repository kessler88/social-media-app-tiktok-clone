//only file that we're going to set up zustand
//usually one single source of state in our application is call a store
import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";
import { BASE_URL } from "../utils";

//a function that accept a set function
const authStore = (set: any) => ({
  userProfile: null,
  allUsers:[],
  //create a method call addUser that set userProfile = user param.
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  //fetch all users.
  fetchAllUsers: async () => {
    const { data } = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: data }); //zustand set function
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
