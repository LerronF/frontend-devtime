import { Subject } from "../utils";

interface IRouter {
    originalPath: string;
    keys: boolean | any[];
    pattern: RegExp;
    component: any;
    active: boolean;
    params: {};
  }


const RegexParams = (str, loose) => {
    if (str instanceof RegExp) return { keys: false, pattern: str };
    var c, o, tmp, ext, keys = [], pattern = '', arr = str.split('/');
    arr[0] || arr.shift();

    while (tmp = arr.shift()) {
        c = tmp[0];
        if (c === '*') {
            keys.push('wild');
            pattern += '/(.*)';
        } else if (c === ':') {
            o = tmp.indexOf('?', 1);
            ext = tmp.indexOf('.', 1);
            keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
            pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
            if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
        } else {
            pattern += '/' + tmp;
        }
    }

    return {
        keys: keys,
        pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    };
}



const TAG = "[Router System]";


class RouteSystemClass  {

    public onNavigate = new Subject<{ component: Object, params?: Object }>();
    public onRouterChange = new Subject<void>();

    public component = undefined;
    public params = undefined;
    public redirect = undefined;

    private routers = {};
    private transformedRouters: IRouter[] = [];
    private path = window.location.hash.replace("#", "");

    constructor() {
        window.onpopstate = this.onpopstate;
        // console.log(TAG, "first run", window.location.hash);
        if (window.location.hash === "") {
            // this will trigger a onpopstate
            window.location.hash = "#/";
        } else {
            // we already have a hash , the user is trying to access a previous link
            console.log(TAG, "***previous link accessed", location.hash, location.search);
            this.redirect = window.location.hash.replace("#", "");
            window.location.hash = "#/";
        }
    }

    public init = async () => {

    }

    private onpopstate = (event: PopStateEvent) => {
        // console.log(TAG, "onpopstate", window.location.hash);
        this.path = window.location.hash.replace("#", "");
        this.matchRouter();
    }

    public addRouters = (newRouter: Object) => {
        this.routers = { ...this.routers, ...newRouter };
        this.transformRouters();
        //console.log(TAG, "addRouters", this.transformedRouters);
        //this.onRouterChange.emit();
    }

    public setRouter = (newRouter: Object) => {
        this.routers = newRouter;
        this.transformRouters();
        // console.log(TAG, "setRouter", this.transformedRouters);
        this.onpopstate(undefined);
        //this.onRouterChange.emit();
    }

    private hashFy = (path: string) => path.charAt(0) !== "#" ? '#' + path : path;

    public push = (path: string, title = "") => {

        const newPath = this.hashFy(path);

        history.pushState(
            { path }, // data
            title, // title 
            location.origin + newPath// url
        );

        // console.log(TAG, "push", newPath);
        this.onpopstate(undefined);
    }

    public replace = (path: string, title = "") => {

        const newPath = this.hashFy(path);

        history.replaceState(
            { path }, // data
            title, // title 
            location.origin + newPath// url
        );

        // console.log(TAG, "push", newPath);
        this.onpopstate(undefined);

    }

    // window.location.hash = "#/"

    private transformRouters = () => {

        this.transformedRouters = Object.keys(this.routers).map(path => {

            const formattedPath = path.replace("#", "");

            const { keys, pattern } = RegexParams(formattedPath, "");

            return {
                originalPath: formattedPath,
                keys,
                pattern,
                component: this.routers[path],
                active: false,
                params: {}
            };
        });
    }

    private matchRouter = () => {

        for (let index = 0; index < this.transformedRouters.length; index++) {
            const router = this.transformedRouters[index];

            // check if this route can match the pattern
            const result = (this.path as string).match(router.pattern);

            if (result) {
                router.active = true;
                router.params = {};

                if (Array.isArray(router.keys)) {
                    router.keys.forEach((key, index) => {
                        router.params[key] = result[index + 1];
                    });
                }
                // update Component on the screen and send params to then
                //console.log(TAG, "====> Route Matched:", this.path);
                this.component = router.component;
                this.params = router.params;

                this.onNavigate.emit({ component: this.component, params: this.params })
                return;

            } else {
                router.active = false;
                router.params = {};
            }

        }

    };

}

export let RouteSystem = new RouteSystemClass();
