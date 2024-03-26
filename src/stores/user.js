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

/**
 * 一般來說，如果您使用了 `src/MemberSystem` 的 `<LogoutBar />` 元件，則不需要呼叫 `getUser` 方法，因為該元件呼叫了它。
 * 您只需要存取 `user` 和 `getUserPhoto` （如果您需要訪問代表 `user.photo` 的照片）：
 * 
 * ```js
 * const Example = () => {
 *     const { user, getUserPhoto } = useUserStore();
 *     return <div> <img src={getUserPhoto()} alt="Photo" /> {user.name}'s photo </div>
 * };
 * ```
 * 
 * 如果您因為某些原因沒使用 <LogoutBar /> 元件，您可能需要附加並呼叫 `getUser` 方法：
 * 
 * ```js
 * const Example = () => {
 *     const { user, getUser, getUserPhoto } = useUserStore();
 *     useEffect( () => { getUser(); }, []);
 *     return <div> <img src={getUserPhoto()} alt="Photo" /> {user.name}'s photo </div>
 * };
 * ```
 */
export const useUserStore = create((set, get) => ({
    /**
     * 使用者資料
     */
    user: USER_DEFAULT,
    /**
     * 呼叫使用者資料 API
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
    /**
     * 修改使用者資料
     */
    updateUser: (newUser) => set({ user: newUser }),
}));


