import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Actions from './actions';
import Selectors from './selectors';
import { State, User } from './types';
import theme from './theme';
import Loading from './components/Loading'

interface HomeProps {
  users: User[];
  fetchUsers: () => void;
  fetchUsersTrigger: () => void;
  fetchUsersSuccess: (payload: any) => void;
  fetchUsersError: (error: any) => void;
  navigation: () => void
}

export const Home = React.memo(({ users, fetchUsersTrigger, fetchUsersSuccess, fetchUsersError , navigation}: HomeProps): React.ReactElement => {
  console.log(users)
  useEffect(() => {
    const makeRequest = async() => {
      fetchUsersTrigger()
      try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (response.ok) {
          fetchUsersSuccess(await response.json())
        } else {
          throw new Error('An error occured')
        }
      } catch (error) {
        fetchUsersError(error)
      }
    }
    makeRequest()
  }, []);

  const userToShow = 2;
  const user = users[userToShow];

  const next = (item) => { navigation.navigate("Post", { item: item }) };
  const prev = () => { };


  return (
    <Container>
        {
          !users.length ? <Loading /> : (
            <FlatList 
              data={users} 
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TopBar>

                <Column>
                  <H1>{item.name}</H1>
                  <S1>{item.website}</S1>
                </Column>
                <Column>
                  <Row>
                    <TouchableOpacity onPress={prev}>
                      <ArrowIcon name="md-arrow-back" size={32} color={theme.colors.accent} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => next(item)}>
                      <ArrowIcon name="md-arrow-forward" size={32} color={theme.colors.accent} />
                    </TouchableOpacity>
                  </Row>
                </Column>
                </TopBar>
              )}
            />
          )
        }
      
    </Container>
  )
});

export default connect((state: State) => ({
  users: Selectors.userData(state),
}), dispatch => ({
  fetchUsersTrigger: (p) => dispatch(Actions.users.fetchUsers.trigger(p)),
  fetchUsersSuccess: (p) => dispatch(Actions.users.fetchUsers.success(p)),
  fetchUsersError: (p) => dispatch(Actions.users.fetchUsers.error(p)),
}))(Home);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

const TopBar = styled.View`
  width: 85%;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  justify-content: space-between;
  flex-direction: row;
  margin-top: 5
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