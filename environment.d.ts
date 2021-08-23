declare namespace NodeJS {
    export interface ProcessEnv {        
        SERVER_HOST?: string;
        SERVER_PORT?: string;
        MYSQL_DB_HOST?: string;
        MYSQL_DB_USER?: string;
        MYSQL_DB_PASS?: string;
        MYSQL_DB_PORT?: string;
        MYSQL_DB_NAME?: string;
        SESSION_KEY?:string;
        MEMCACHE_HOST?:string;
        MEMCACHE_PORT?:string;
        MEMCACHE_SECRET?:string;
    }
}