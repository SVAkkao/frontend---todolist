/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

export const modal_modules = () => {
    const [show, set_show] = useState(false);
    const close_modal = () => set_show(false);
    const show_modal = () => set_show(true);
    return { show, show_modal, close_modal };
};

export const modal_mode_modules = () => {
    const [mode, set_mode] = useState("");
    const REMOVING = "removing";
    const EDITING = "editing";
    const CHANGELOG = "changelog";
    return {
        // The state itdelf
        mode, set_mode,
        // State modes
        REMOVING, EDITING, CHANGELOG
    };
};

export const list_modules = (apipath) => {
    const [the_list, set_the_list] = useState([]);
    const ajax_list = () => {
        set_the_list([]);
        const ajax = fetch(apipath).then( r => r.json() );
        ajax.then( (res) => {
            set_the_list([...res.result]);
        });
    };
    return { the_list, set_the_list, ajax_list };
};
