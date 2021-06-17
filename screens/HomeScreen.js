/* import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AdSlideShow from "../components/AdSlideshow";
import Posting from "../components/Posting";

const renderPosting = ({ item }) => {
  return <Posting name={item.name} source={item.source} />;
};

// TODO Fetching data of company postings
const fetchPostingData = () => {
  const data = [
    {
      id: "id1",
      name: "Title and Details",
      source: "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
    {
      id: "id2",
      name: "Title and Details",
      source: "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
    {
      id: "id3",
      name: "Title and Details",
      source: "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
    {
      id: "id4",
      name: "Title and Details",
      source: "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
  ];
  return data;
};

const HomeScreen = (props) => {
  // TODO Unsure if this needs to be a state
  const [postings, setPostings] = useState(fetchPostingData());
  return (
    <View style={styles.screen}>
      <AdSlideShow />
      <View style={styles.listContainer}>
        <FlatList
          data={postings}
          renderItem={renderPosting}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "90%",
    paddingVertical: 10,
  },
  list: {
    flexGrow: 1,
  },
});

export default HomeScreen; */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Button } from 'react-native';

import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';

import { ImageSwiper } from '../components/AdSwiper';
import ItemCard from '../components/ItemCard';

const images = [
    "https://cdn.business2community.com/wp-content/uploads/2013/09/best-press-release-example.jpg",
    "https://en.pimg.jp/054/313/779/1/54313779.jpg",
    "https://secureservercdn.net/160.153.138.163/t55.c04.myftpupload.com/wp-content/uploads/2016/01/IB-Examples.jpg",
    "https://image.shutterstock.com/image-illustration/server-room-center-exchanging-cyber-260nw-784596430.jpg"
];

const HomeScreen = () => {

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Button title={'Sign Out'} />
            onPress={() => {dispatch(authActions.logout())}}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    }
});

export default HomeScreen;