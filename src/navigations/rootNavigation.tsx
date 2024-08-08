import * as React from 'react';

import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

interface NavProps{
    name:string,
    params?:object
}
export function navigate(props:NavProps) {
    navigationRef.current?.navigate(props.name, props.params);
}
