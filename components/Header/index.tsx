import React from 'react'

import styled from 'styled-components/native';


export default function Header(props) {
    const {
        title,
        onPressLeft,
        renderLeft,
      } = props;

    return (
        <Container>
                <ContentLeft
                onPress={onPressLeft}>
                {renderLeft()}
                </ContentLeft>
            <TextContainer>
                <Text>
                {title}
                </Text>
            </TextContainer>
            </Container>
    )
}

  

  const Container = styled.View`
    height: 45px;
    flex-direction: row
  `

  const ContentLeft = styled.TouchableOpacity`
    justify-content: center;
    padding-left: 20px;
    width: 60px;
  `

  const TextContainer = styled.View`
    flex: 22;
    align-items: center;
    justify-content: center;
    padding-right: 50px;
  `

  const Text = styled.Text`
  `