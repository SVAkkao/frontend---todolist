const API_HOST = process.env.REACT_APP_API_URL;

export async function ajaxAddList() {
    const token = localStorage.getItem("userToken");
    const r = await fetch(`${API_HOST}/api/POST/addlist`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: "請輸入旅行名稱..."
        })
    });
    return await r.json();
}
export async function ajaxRemoveList(tlid = 0) {
    const token = localStorage.getItem("userToken");
    const r = await fetch(`${API_HOST}/api/POST/deletelist`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tlid })
    });
    if (r.status === 204) {
        return {};
    }
    return await r.json();
}

