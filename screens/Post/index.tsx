import React, {useState} from 'react';
import {RefreshControl, FlatList,SafeAreaView} from 'react-native';
import PostItem from '../../components/PostItem'
import ProfileAuthor from '../../components/ProfileAuthor'
import { connect } from 'react-redux';
import Actions from '../../actions';
import Selectors from '../../selectors';
import { State, Post } from '../../types';
import Header from '../../components/Header'
import Icon from '@expo/vector-icons/FontAwesome5';
import Loading from '../../components/Loading'
  interface PostProps {
    posts: Post[];
    fetchPosts: () => void;
    fetchPostsTrigger: () => void;
    fetchPostsSuccess: (payload: any) => void;
    fetchPostsError: (error: any) => void;
    navigation: () => void;
    route: () => void;
  }
  import useHook from '../../useHook';
  
  

  export const PostComp = React.memo(({ posts, fetchPostsTrigger, fetchPostsSuccess, fetchPostsError , navigation, route}: PostProps): React.ReactElement => {
    const { params: { item: user } }: any = route

  const [refreshing] = useState(false);
  useHook(fetchPostsTrigger,fetchPostsSuccess,fetchPostsError,`posts?userId=${user.id}`)

  if (!posts.length) return <Loading />


  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{top: 'always'}}>
       <Header
            title={"Post"}
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
          <FlatList
            refreshControl={
              <RefreshControl
                colors={["#000"]}
                tintColor={"#000"}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={posts}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item, index}) => (
              <PostItem
                title={item.title}
                description={item.body}
                onPress={() => navigation.navigate('PostDetail', { item: item, user: user})}>
                <ProfileAuthor
                image={{}}
                  name={user.name}
                  description={user.website}
                  style={{paddingHorizontal: 20}}
                />
              </PostItem>
            )}
          />
    </SafeAreaView>
  );
})

export default connect((state: State) => ({
  posts: Selectors.postData(state),
}), dispatch => ({
  fetchPostsTrigger: (payload) => dispatch(Actions.posts.fetchPosts.trigger(payload)),
  fetchPostsSuccess: (payload) => dispatch(Actions.posts.fetchPosts.success(payload)),
  fetchPostsError: (payload) => dispatch(Actions.posts.fetchPosts.error(payload)),
}))(PostComp);
