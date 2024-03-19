// const def = { pid: "", comment: "", rate: "" };
/**
 * 
 * @param {Element} form_dom A form element. At least, you should have:
 * 1. pid
 * 2. comment
 * 3. rate
 * @returns 
 */
export function create_comment_api(form_dom) {
    const ajax_api = `${process.env.REACT_APP_API_URL}/api/comment`;
    const token = localStorage.getItem("userToken");
    const ajax = fetch(ajax_api, {
        method: "POST",
        body: new FormData(form_dom),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        }
    }).then(r => r.json());
    return ajax;
}

export function change_comment_api(form_dom, cid) {
    const ajax_api = `${process.env.REACT_APP_API_URL}/api/comment/${cid}`;
    const token = localStorage.getItem("userToken");
    const ajax = fetch(ajax_api, {
        method: "PUT",
        body: JSON.stringify({
            "comment": form_dom.comment.value,
            "rate": form_dom.rate.value,
        }),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }).then(r => r.json());
    return ajax;
}

export function delete_comment_api(cid) {
    const ajax_api = `${process.env.REACT_APP_API_URL}/api/comment/${cid}`;
    const token = localStorage.getItem("userToken");
    const ajax = fetch(ajax_api, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        }
    }).then(r => r.json());
    return ajax;
}

export async function get_user_comments_api() {
    const token = localStorage.getItem("userToken");
    const r = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user-comment`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }
    );
    return await r.json();
}
