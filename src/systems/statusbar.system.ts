import { Subject } from "../utils"


export interface MenuItem {
    name:string;
    component: Object;
    side: "left" | "right";

}

let items: MenuItem[] = [];

export const addMenuItem = (item: MenuItem) => {
    // skip if exist
    if( items.find( i => i.name === item.name)) return;
    
    items = [...items, item];
    stateChange.emit();
}

export let getItems = () => items;



let _isShown = false;
export const isShown = () => _isShown;

export const show = () => {
    _isShown = true;
    stateChange.emit()
}
export const hide = () => {
    _isShown = false;
    stateChange.emit()
}

//back button
let _isShowBackButton = false;
export const isShowBackButton = () => _isShowBackButton;

export const showBackButton = () => {
    _isShowBackButton = true;
    stateChange.emit()
}
export const hideBackButton = () => {
    _isShowBackButton = false;
    stateChange.emit()
}

//settings control



let title = ""
export const setTitle = (newTitle: string) => {
    title = newTitle;
    stateChange.emit();
}

export const getTitle = () => title;

export const stateChange = new Subject<void>();