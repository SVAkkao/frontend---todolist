import { useState, useEffect } from "react";

export default function CreateComment() {
    // User token
    const [token, set_token] = useState("");
    const get_user = e => {
        e.preventDefault();
        const ajax = fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: "POST", body: new FormData(e.target)
        }).then( s => s.json() );
        ajax.then( (response) => {
            if( response.token ) {
                set_token(response.token);
            } else {
                alert( response.message );
            }
        });
    };
    // Project
    const [projects, set_projects] = useState([]);
    const get_projects = () => {
        const ajax = fetch(`${process.env.REACT_APP_API_URL}/api/project`, {
            method: "GET",
        }).then( s => s.json() );
        ajax.then( (response) => {
            set_projects(response.result);
        });
    };
    // Sent comment
    const sent_comment = (e) => {
        e.preventDefault();
        if( !token ) {
            alert("Please login");
            return false;
        }
        const ajax = fetch(`${process.env.REACT_APP_API_URL}/api/comment`, {
            method: "POST",
            body: new FormData(e.target),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }).then( s => s.json() );
        ajax.then( (response) => {
            if( response.token ) {
                alert( response.message );
            } else {
                alert( response.message );
            }
        });
    };
    useEffect(() => {
        let mounted = true;
        console.log(mounted);
        if( mounted ) {
            get_projects();
        }
        return () => mounted = false;
    }, []);
    return (<div>
        <p>Get User</p>
        <form onSubmit={get_user}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="User password" />
            <input type="submit" value="Get user" />
            <p>Token: <code>{ token }</code></p>
        </form>
        <hr />
        <form onSubmit={sent_comment}>
            <select name="pid">
                { projects.map( its => <option key={its.pid} value={its.pid}>{its.pname} at {its.aid}</option> ) }
            </select>
            <input type="text" name="comment" placeholder="comment" />
            <input type="number" name="rate" placeholder="rate" max={10} min={1} />
            <input type="submit" value="Sent comment" />
        </form>
    </div>);
}
