import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import i18n from '../translations/i18n';
import { VARIABLES } from '../utils/variables';
import { API_BASE_URL } from '../utils/urls';
import { Alert } from 'react-native';


interface ErrorResponse {
    message: string;
}

interface RequestOptions {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    data?: any;
    onUploadProgress?: ((progressEvent: any) => void) | null;
}

// Common HTTP request function
export const httpRequestAPI = async (
    url:string, 
    method:'get' | 'post' | 'put' | 'delete' = 'get', 
    data?: any , 
    onUploadProgress?:((progressEvent:any)=>void)
    ): Promise<any> => {
    
    var headers = {
        'Authorization': `Bearer ${VARIABLES.token}`,
        // "Content-Type": "multipart/form-data",
        'Content-Type': 'application/json',
        "Accept": "application/json",
        // "access-control-allow-credentials": "true",
        // 'Accept-Language':i18n.locale,
        // "languageCode":i18n.locale,
        // "timezone": getCurrentTimezone(),
    }
    console.log('PARAMSSS',url,method,data,headers);
    try {
        const response = await axios({
        url,
        method,
        data,
        headers,
        onUploadProgress,
        baseURL:API_BASE_URL
        });

        console.log('response',response);

        // Return the response data
        return response;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // The request was made, but the server responded with a status code outside of the 2xx range
                console.error('Server responded with an error:', error.response.data);
                Alert.alert(`${error.response.data.message}`);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received from the server', error);
                Alert.alert('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
                Alert.alert(`Error setting up the request: ${error.message}`);
            }
        } else {
            // Non-Axios error
            console.error('An error occurred during the request:', error);
            Alert.alert(`An error occurred during the request: ${error}`);
        }

        // Return an error object or handle it as needed
        return { error: true, message: 'An error occurred during the request' };
    }
};

// // Example usage:
// const fetchData = async () => {
//     const apiUrl = 'https://api.example.com/data';
    
//     // Make a GET request
//     const getDataResponse = await httpRequest(apiUrl);
  
//     // Make a POST request with onUploadProgress callback
//     const postData = { key: 'value' };
//     const postDataResponse = await httpRequest(
//       apiUrl,
//       'post',
//       postData,
//       { 'Content-Type': 'multipart/form-data' }, // Example headers for multipart/form-data
//       (progressEvent) => {
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         console.log(`Upload Progress: ${percentCompleted}%`);
//         // You can handle the progress as needed, e.g., update a progress bar
//       }
//     );
  
//     // Handle the responses
//     console.log('GET Data:', getDataResponse);
//     console.log('POST Data:', postDataResponse);
// };