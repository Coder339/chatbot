interface VARIABLE_PROPS  {
    token: string
    user: null;
    notification: boolean;
    isDarkMode: boolean;
    deviceToken: null;
    guestUser: boolean;
    maxPrice: number;
    payment_methods: never[];
    Shipping_Feasibilty: never[];
    Support_Type: never[];
    connect: never[];
}

export const VARIABLES : VARIABLE_PROPS = {
    // API_URL: API_URL,
    token: '',
    user: null,
    notification: false,
    isDarkMode: false,
    deviceToken: null,
    guestUser:false,
    maxPrice:1000000,
    payment_methods:[],
    Shipping_Feasibilty:[],
    Support_Type:[],
    connect:[]
};
  
export const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;