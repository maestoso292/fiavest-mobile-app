/* import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AdSlideShow from "../components/AdSlideshow";
import Posting from "../components/Posting";
import AdPopup from "../components/AdPopup";

const renderPosting = ({ item }) => {
  return <Posting name={item.name} source={item.source} />;
};

// TODO Fetching data of company postings
const fetchPostingData = () => {
  const data = [
    {
      id: "id1",
      name: "Title and Details",
      source:
        "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
    {
      id: "id2",
      name: "Title and Details",
      source:
        "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
    {
      id: "id3",
      name: "Title and Details",
      source:
        "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
    {
      id: "id4",
      name: "Title and Details",
      source:
        "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
  ];
  return data;
};

// TODO Fetching ads (Company ads? Playstore ads?)
const fetchAdSlideshowData = () => {
  return [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
  ];
};

// TODO Fetching ad popup (Company ad?)
const fetchAdPopup = () => {
  return "https://source.unsplash.com/1024x768/?nature";
};

const HomeScreen = (props) => {
  // TODO Unsure if this needs to be a state
  const [postings, setPostings] = useState(fetchPostingData());
  const [adVisible, setAdVisible] = useState(true);

  const closeAdPopup = () => {
    setAdVisible(false);
  };

  return (
    // TODO Header for the screen
    <SafeAreaView style={styles.screen}>
      <AdPopup
        visible={adVisible}
        source={fetchAdPopup()}
        onPress={closeAdPopup}
        animationType="fade"
      />
      <AdSlideShow data={fetchAdSlideshowData()} />
      <View style={styles.listContainer}>
        <FlatList
          data={postings}
          renderItem={renderPosting}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "90%",
    paddingTop: 10,
  },
  list: {
    flexGrow: 1,
  },
});

export default HomeScreen; */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';

import { ImageSwiper } from '../components/AdSwiper';
import ItemCard from '../components/ItemCard';

const images = [
    "https://cdn.business2community.com/wp-content/uploads/2013/09/best-press-release-example.jpg",
    "https://en.pimg.jp/054/313/779/1/54313779.jpg",
    "https://secureservercdn.net/160.153.138.163/t55.c04.myftpupload.com/wp-content/uploads/2016/01/IB-Examples.jpg",
    "https://image.shutterstock.com/image-illustration/server-room-center-exchanging-cyber-260nw-784596430.jpg"
];

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ImageSwiper images={images} />
            <ItemCard 
                imageURL="https://cdn-media-2.freecodecamp.org/w1280/5f9c9e5e740569d1a4ca3cbb.jpg"
                title="Title"
                details="Lorem ipsum dolor sit amet."
            />
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