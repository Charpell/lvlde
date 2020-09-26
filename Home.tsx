import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Actions from './actions';
import Selectors from './selectors';
import { State, User } from './types';
import theme from './theme';
import Loading from './components/Loading'
import { useScrollHandler } from 'react-native-redash'
import Animated from 'react-native-reanimated'
const { width } = Dimensions.get("window")
import useHook from './useHook'


interface HomeProps {
  users: User[];
  fetchUsers: () => void;
  fetchUsersTrigger: () => void;
  fetchUsersSuccess: (payload: any) => void;
  fetchUsersError: (error: any) => void;
  navigation: () => void
}

export const Home = React.memo(({ users, fetchUsersTrigger, fetchUsersSuccess, fetchUsersError , navigation}: HomeProps): React.ReactElement => {
  const scroll = useRef(null)
  const { scrollHandler } = useScrollHandler()
  useHook(fetchUsersTrigger,fetchUsersSuccess,fetchUsersError,'users')
  


  const next = (scroll,index) => { 
    scroll.current
    .getNode()
    .scrollTo({ x: width * (index + 1), animating: true })
  };
  const prev = (scroll,index) => { 
    scroll.current
    .getNode()
    .scrollTo({ x: width * (index - 1), animating: true })};

    if (!users.length) return <Loading />


  return (
    <Container>
        <AnimatedHeader>
          <Animated.ScrollView 
          ref={scroll}
          horizontal 
          snapToInterval={width} 
          decelerationRate="fast" 
          showsHorizontalScrollIndicator={false} 
          bounces={false}
          scrollEventThrottle={1}
          {...scrollHandler}
          >
              {users.map((item, index) => {
                const last = index === users.length - 1
                return (
                  <TopBar onPress={() => navigation.navigate("Post", { item: item })} key={index}>

                    <Column>
                      <H1>{item.name}</H1>
                      <S1>{item.website}</S1>
                    </Column>
                    <Column>
                      <Row>
                        <TouchableOpacity onPress={() => prev(scroll,index)}>
                          <ArrowIcon name="md-arrow-back" size={32} color={theme.colors.accent} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => next(scroll,index)}>
                          <ArrowIcon name="md-arrow-forward" size={32} color={theme.colors.accent} />
                        </TouchableOpacity>
                      </Row>
                    </Column>
                    </TopBar>
                )
              })}
            </Animated.ScrollView>
          </AnimatedHeader>
      
    </Container>
  )
});

export default connect((state: State) => ({
  users: Selectors.userData(state),
}), dispatch => ({
  fetchUsersTrigger: (payload) => dispatch(Actions.users.fetchUsers.trigger(payload)),
  fetchUsersSuccess: (payload) => dispatch(Actions.users.fetchUsers.success(payload)),
  fetchUsersError: (payload) => dispatch(Actions.users.fetchUsers.error(payload)),
}))(Home);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

const TopBar = styled.TouchableOpacity`
  width: 400px;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  justify-content: space-around;
  flex-direction: row;
  margin-top: 5px;
`

const Column = styled.View`
`;

const Row = styled.View`
  flex-direction: row;
`

const ArrowIcon = styled(Ionicons)`
  margin: 0 ${({ theme }) => theme.space.md}px;
`

const H1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.basic};
`

const S1 = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.basic200};
`
const FlatList = styled.FlatList`
    margin-top: 32px;
    flex: 1;
`
const Header = styled.View`
  margin-top: 100px;
  height: 100px;
`

const AnimatedHeader = Animated.createAnimatedComponent(Header)