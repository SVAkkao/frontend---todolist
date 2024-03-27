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

    return r.json();

    // fetch(`${API_HOST}/api/POST/addlist`, {
    //     method: "POST",
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         title: "請輸入旅行名稱..."
    //     })
    //   })
    //   .then(async (response) => {
    //     const tlidResult = await response.json();
    //     console.log(tlidResult);
    //     console.log(tlidResult.result.tlid);
    //     fetch(`${API_HOST}/api/POST/addjourney`, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             tlid : tlidResult.result.tlid,
    //             aname: "輸入您的第一個行程..."
    //         })
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
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

