export interface IListCity {
    cod: string;
    count?:number;
    cnt?:number;
    message: string;
    list:ICity[];
}

export interface ICity{
    pop?: number,
    base?: string;
    clouds: {all:number};
    coord?: {lat: number, lon: number};
    dt: number | string;
    dt_txt?: string;
    formated_dt_txt?: string,
    formated_time_txt?: string,
    id?: number;
    main: IMain;
    name?: string;
    rain?: any ;
    snow?: any;
    sys: ISys;
    weather: IWeather[];
    wind: {speed: number, deg: number, gust?: number}
    timezone?: number;
    visibility?: number;
}


export interface ISys{
    type?: number;
    id?: number;
    country?: string; 
    sunrise?: number | string; 
    sunset?: number | string;
}

export interface IMain{
    feels_like: number;
    grnd_level?: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface IWeather{
    description: string;
    icon: string;
    id: number;
    main: string;
}
