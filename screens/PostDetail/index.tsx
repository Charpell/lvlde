import React from 'react';
import styled from 'styled-components/native';

import Header from '../../components/Header'
import PostItem from '../../components/PostItem'
import ProfileAuthor from '../../components/ProfileAuthor'
import Icon from '@expo/vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import Actions from '../../actions';
import Selectors from '../../selectors';
import { State, Comment } from '../../types';
import useHook from '../../useHook';

interface PostDetailProps {
  comments: Comment[];
  fetchComments: () => void;
  fetchCommentsTrigger: () => void;
  fetchCommentsSuccess: (payload: any) => void;
  fetchCommentsError: (error: any) => void;
  navigation: () => void;
  route: () => void;
}

export const CommentComp = React.memo(({ comments, fetchCommentsTrigger, fetchCommentsSuccess, fetchCommentsError ,navigation, route}: PostDetailProps): React.ReactElement => {
  const { params: { item: post, user } }: any = route

  useHook(fetchCommentsTrigger,fetchCommentsSuccess,fetchCommentsError,`comments?postId=${post.id}`)

  

  return (
      <Container>
      <Header
            title={"Post Detail"}
                renderLeft={() => {
                return (
                    <Icon
                        name="arrow-left"
                        size={20}
                        color={'#000'}
                        enableRTL={true}
                        />
                );
                }}
                onPressLeft={() => {
                navigation.goBack();
                }}
            />
          <Author
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <ProfileAuthor
              image={{ uri: "https://images.pexels.com/photos/4429509/pexels-photo-4429509.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}}
              name={user.name}
              description={user.email}
              textRight="Jun 2018"
              style={{
                marginTop: 20,
              }}
            />
            <Text>
              {post.tile}
            </Text>
            <Text>
              {post.body}
            </Text>
            <Comments>

            <Text>
                {'Comments'}
              </Text>
              <FlatList 
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <PostItem
                    title={item.title}
                    description={item.body}
                    onPress={() => console.log('Comment')}>
                  </PostItem>
                )}
              />
            </Comments>
           
          </Author>
      </Container>
  );
})

export default connect((state: State) => ({
  comments: Selectors.commentData(state),
}), dispatch => ({
  fetchCommentsTrigger: (payload) => dispatch(Actions.comments.fetchComments.trigger(payload)),
  fetchCommentsSuccess: (payload) => dispatch(Actions.comments.fetchComments.success(payload)),
  fetchCommentsError: (payload) => dispatch(Actions.comments.fetchComments.error(payload)),
}))(CommentComp);


  const FlatList = styled.FlatList`
`

const Container = styled.SafeAreaView`
  flex: 1;
`

const Author = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`

const Comments = styled.View`
  margin-top: 20px;
`

const Text = styled.Text``