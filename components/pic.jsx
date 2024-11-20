import React from 'react';
import { View, Image } from 'react-native';

const PicComponent = ({ size, image }) => {
    return (
        <View style={{}}>
            <Image
                source={
                    image !== "" ? { uri: image } : require(
                        "../assets/images/react-logo.png"
                    )
                }
                style={{ width: size, height: size, borderRadius: size / 2 }}
            />
        </View>
    );
};

export default PicComponent;
