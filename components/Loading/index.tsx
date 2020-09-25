import React from 'react'
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native'

export default function index() {
    return (
        <Container>
            <ActivityIndicator size="large" color={'#000'} />
        </Container>
    )
}


const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #ffffff
`