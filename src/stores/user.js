import { create } from "zustand";

const API_HOST = process.env.REACT_APP_API_URL;
const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

const USER_DEFAULT = {
    "id": 0,
    "name": "",
    "email": "",
    "created_at": "",
    "updated_at": "",
    "photo": "",
    "cellphone": ""
};

export const useUserStore = create((set, get) => ({
    user: USER_DEFAULT,
    /**
     * HTTP GET the user
     */
    getUser: async () => {
        set({ user: USER_DEFAULT });
        try {
            const token = localStorage.getItem("userToken");
            const ajax = await fetch(`${API_HOST}/api/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }).then((response) => response.json());
            set({ user: ajax });
        } catch (error) {
            console.error("Fetching data error: ", error);
            set({ user: USER_DEFAULT });
        }
    },
    /**
     * 取得用戶大頭貼
     * @returns {String} 用戶大頭貼
     */
    getUserPhoto: () => {
        const photo = get().user.photo;
        return photo ? `${API_IMAGE}${photo}` : "avatar-template.svg";
    },
    /**
     * 重設用戶
     */
    resetUser: () => set({ user: USER_DEFAULT }),
    updateUser: (newUser) => set({ user: newUser }),
}));


