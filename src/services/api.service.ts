import * as AuthService from "./auth.service";


export enum Endpoints {
    AUTH_TOKEN = "api/v1/auth/token",
    PROJECT = "api/v1/project",
    PROJECT_STATS = "api/v1/project-stats",
}


export const getURl = () => {
    const host = "localhost";//location.host.replace(`:${location.port}`, "");
    const port = 8282;
    const protocol = "http";
    const url =  `${protocol}://${host}:${port}`;
    console.log({url});
    return url;
}

type METHODS = "GET" | "POST" | "PUT" | "DELETE";


export /**
 * Primitive call used by other methods
 *
 * @template T
 * @param {Endpoints} endpoint
 * @param {METHODS} [method="GET"]
 * @param {string} [params=""]
 * @param {string} [token=""]
 * @param {*} [body=null]
 * @returns {Promise<T>}
 */
    const call = async <T>(endpoint: Endpoints, method: METHODS = "GET", params = "", token = "", body = null): Promise<T> => {

        const init: RequestInit = {
            body: body && JSON.stringify(body),
            method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json; charset=utf-8"
            }
        }

        const request = await fetch(`${getURl()}/${endpoint}/${params}`, init)
            .then(r => r.json())

        if (request.error) {
            throw request.error
        }

        return request as T

    }


 /** export 
 * Get All Projects
 *
 * @returns {Promise<Project[]>}
 
    const getProjects = async (): Promise<Project[]> => {
        const projects = await call<Project[]>(Endpoints.PROJECT, "GET", "", AuthService.getToken());
        return projects;

    }*/

/**export 
 * Get All Projects Stats
 *    
 * @returns {Promise<ProjectStats[]>}
 
    const getProjectStats = async (): Promise<ProjectStats[]> => {
        const projectStats = await call<ProjectStats[]>(Endpoints.PROJECT_STATS, "GET", "", AuthService.getToken());
        projectStats.forEach(stats => {
            stats.forecast = stats.forecast && new Date(stats.forecast);
            stats.planStartDate = stats.planStartDate && new Date(stats.planStartDate);
            stats.planEndDate = stats.planEndDate && new Date(stats.planEndDate);

            // transform dates inside epic
            stats.epics = stats.epics.map(e => {

                e.planStartDate = e.planStartDate && new Date(e.planStartDate)
                e.planEndDate = e.planEndDate && new Date(e.planEndDate)

                return e
            })
            return stats;
        });
        return projectStats;

    }*/


/**export 
 * Get Project By Project Key
 *
 * @param {string} key
 * @returns {Promise<Project[]>}
 
    const getProjectByKey = async (key: string): Promise<Project[]> => {
        const projects = await call<Project[]>(Endpoints.PROJECT_STATS, "GET", key, AuthService.getToken());
        return projects;
    }*/
