import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet,View, Text } from 'react-native';
import ImageView from "react-native-image-viewing";

interface ImageViewProps {
    // Define your component props here
    url:string,
    visibleImage:boolean,
    setVisibleImage:Dispatch<SetStateAction<boolean>>

}

const AppImageView: React.FC<ImageViewProps> = ({url,visibleImage,setVisibleImage}) => {
    // const [visibleImage, setVisibleImage] = useState<boolean>(false)

    return (
        <ImageView
            images={[{ uri: url }]}
            imageIndex={0}
            visible={visibleImage}
            onRequestClose={() => setVisibleImage(false)}
            doubleTapToZoomEnabled={true}
        />
    );
};

export default AppImageView;

const styles = StyleSheet.create({})