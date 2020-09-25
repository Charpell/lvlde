import React from "react";
import styled from 'styled-components/native';


export default function ProfileAuthor(props) {
  const {
    onPress,
    name,
    description,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Cover>
        <ImageItem source={{ uri: "https://i.picsum.photos/id/613/200/300.jpg?hmac=0SxLnCBuV8ozZLRM2aLsgqfaFXvvICJP-8ELG_wt0gE"}}  />
        <View>
          <Text>
            {name}
          </Text>
          <Text>
            {description}
          </Text>
        </View>
      </Cover>
    </TouchableOpacity>
  );
}

  
  const TouchableOpacity = styled.TouchableOpacity`
    flex-direction: row;
    padding-bottom: 10px;
    padding-top: 20px;
    padding-left: 20px;
  `

  const Cover = styled.View`
    flex: 8;
    flex-direction: row;
    align-items: center
  `

  const ImageItem = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 5px;
  `

  const View = styled.View`
  `

  const Text = styled.Text``