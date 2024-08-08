import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { KEYCHAIN } from './keychain';
import Share from 'react-native-share';
import moment from 'moment';
import { VARIABLES } from './variables';
import { setData } from './storage';

import NetInfo from '@react-native-community/netinfo';
// import { useQuery,useQueryClient } from '@tanstack/react-query'
// import { onlineManager } from '@tanstack/react-query'

// Initialize the query client
// const queryClient = useQueryClient();

// Listen for network connectivity changes
NetInfo.addEventListener(state => {
    console.log('state', state);

    if (state.isConnected) {
        console.warn('isNetworkRestored', state.isConnected);

        // Fetch data for all queries when the internet connection is restored
        // queryClient.invalidateQueries(); // This will refetch all queries
    }
});

// onlineManager.setEventListener(setOnline => {
//     return NetInfo.addEventListener(state => {
//         console.log('isNetworkRestored--onlineManager',state);
//       setOnline(!!state.isConnected)
//     })
// })


interface BucketProps {
    image: string,
    filename: string,
    type: string,
    storePath: string
}

// export const uploadToS3BUCKET = async ({image,filename,type,storePath}:BucketProps): Promise<any> => {
//     let imageObj = {
//         // `uri` can also be a file system path (i.e. file://)
//         uri: image,
//         name: filename,
//         type: type,
//     };
//     console.log('log333333', imageObj);

//     // setLoading(true)
//     const S3RESULT = await RNS3.put(imageObj, {
//         keyPrefix: `${storePath}/`, // Ex. myuploads/
//         bucket: KEYCHAIN.s3_bucket, // Ex. aboutreact
//         region: KEYCHAIN.s3_region, // Ex. ap-south-1
//         accessKey: KEYCHAIN.s3_access_key,
//         secretKey: KEYCHAIN.s3_secret_key,
//         successActionStatus: 201,
//     })
//         .progress((progress) =>
//         // setUploadSuccessMessage(
//         //     `Uploading: ${progress.loaded / progress.total} (${progress.percent
//         //     }%)`,
//         // )
//         console.log(
//             `Uploading: ${progress.loaded / progress.total} (${progress.percent}%)`,
//         ),
//         )
//         .then((response:any) => {
//         // console.log('response s3 ----', response);

//         if (response.status !== 201) {
//             // alert('Failed to upload image to S3');
//             console.log('image to s3--->', response);
//             let data = {
//             statusCode: 500,
//             response: response,
//             };

//             return data;
//         }
//         // return response

//         let {bucket, etag, key, location} = response.body?.postResponse ?? {};
//         console.log(`Uploaded Successfully: 
//                 \n1. bucket => ${bucket}
//                 \n2. etag => ${etag}
//                 \n3. key => ${key}
//                 \n4. location => ${location}`);

//         let data = {
//             statusCode: 201,
//             response: key,
//         };
//         return data;
//         })
//         .catch(error => {
//         console.log('s3 error', error);
//         let data = {
//             statusCode: 500,
//             response: error,
//         };

//         return data;
//         // setLoading(false)
//         });

//     return S3RESULT;
// };

const TimeFormat = () => { };

export const getCurrentTimezone = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('Timezone--ooo', timezone);
    return timezone;
};

// export default {uploadToS3BUCKET,TimeFormat}

// const styles = StyleSheet.create({})
interface ImagesPath {
    image: string;
}

// export const shareUrlImage = (imagesPath:ImagesPath):Promise<void> => {
//     return new Promise<void>((resolve, reject) => {
//         let imagePath: string | null = null;
//         RNFetchBlob.config({
//         fileCache: true,
//         })
//         .fetch('GET', imagesPath.image)
//         // the image is now dowloaded to device's storage
//         .then(resp => {
//             // the image path you can use it directly with Image component
//             imagePath = resp.path();
//             return resp.readFile('base64');
//         })
//         .then(base64Data => {
//             // here's base64 encoded image
//             var imageUrl = 'data:image/png;base64,' + base64Data;
//             const shareImage = {
//             url: imageUrl,
//             };
//             Share.open(shareImage)
//             .then(res => {
//                 console.log(res);
//                 resolve();
//             })
//             .catch(err => {
//                 err && console.log(err);
//                 resolve();
//             });
//             // remove the file from storage
//             if (imagePath) {
//                 RNFetchBlob.fs.unlink(imagePath);
//             }
//         })
//         .catch(err => {
//             reject();
//         });
//     });
// };



interface UnitMappingProps {
    [key: string]: string;
    s: string,
    m: string,
    h: string,
    d: string
}
export const customFromNow = (datetime: string) => {
    const formatted = moment(datetime).fromNow();

    // Regular expression to match numerical value and unit
    const regex = /(\d+)\s+(second|minute|hour|day)s?/i;
    // const regex = /(\d+)\s+(an?|a few)\s+(seco nd|minute|hour|day)s?|a\s+(second|minute|hour|day)/i;
    const match = formatted.match(regex);

    if (match) {
        const value = match[1];
        const unit = match[2].charAt(0).toLowerCase(); // Extract the first character
        const unitsMapping: UnitMappingProps = {
            s: 's', // seconds
            m: 'm', // minutes
            h: 'h', // hours
            d: 'd', // days
        };

        return `${value}${unitsMapping[unit]}`;
    }

    return formatted; // Return the original formatted string if no match
};

export const delay = async (time: number): Promise<void> => {
    return new Promise<void>(resolve => setTimeout(() => resolve(), time));
};


export function removeExtension(filename: string) {
    return Platform.OS === "ios" ? filename : (filename.substring(0, filename.lastIndexOf('.')) || filename)
}

export const containsHttpsLink = (str: string): boolean => {
    const regex = /(https?|http):\/\/\S+/;
    console.log(regex.test(str))
    return regex.test(str);
};


export const getDateString = (time: number) => {
    const diff = moment(moment()).diff(moment(time), "day")
    console.log(diff)
    switch (diff) {
        case 0:
            return "Today"
        case 1:
            return "Yesterday"
        default:
            return moment(time).format("DD/MM/YYYY")
            break;
    }
}


// USAGE

//   const prevChat = await getStateDataAsync(setPostData);

//   // Log the current state before making any changes
//   console.log('Current postData:', prevChat);

//   let updatedPostData = prevChat.map(post => {