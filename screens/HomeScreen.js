import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Posting from "../components/PostingCard";
import AdPopup from "../components/AdPopup";
import { ImageSwiper } from "../components/AdSwiper";
import ItemCard from "../components/ItemCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_LIGHT, BORDER_PRIMARY } from "../constants/colors";

const renderPosting = ({ item }) => {
  return <Posting name={item.name} details={item.body} source={item.source} />;
};

// TODO Fetching data of company postings
const fetchPostingData = () => {
  const body =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
  const data = [
    {
      id: "id1",
      name: "Title",
      body: body,
      source: "https://source.unsplash.com/1024x768/?nature",
    },
    {
      id: "id2",
      name: "Title",
      body: body,
      source:
        "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    },
    {
      id: "id3",
      name: "Title",
      body: body,
      source: "https://source.unsplash.com/1024x768/?tree",
    },
    {
      id: "id4",
      name: "Title",
      body: body,
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
    "https://cdn.business2community.com/wp-content/uploads/2013/09/best-press-release-example.jpg",
    "https://en.pimg.jp/054/313/779/1/54313779.jpg",
    "https://secureservercdn.net/160.153.138.163/t55.c04.myftpupload.com/wp-content/uploads/2016/01/IB-Examples.jpg",
    "https://image.shutterstock.com/image-illustration/server-room-center-exchanging-cyber-260nw-784596430.jpg",
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
    <View style={styles.screen}>
      <AdPopup
        visible={adVisible}
        source={fetchAdPopup()}
        onPress={closeAdPopup}
        animationType="fade"
      />
      <ImageSwiper images={fetchAdSlideshowData()} />

      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_LIGHT,
  },
  listContainer: {
    flex: 1,
    width: "90%",
    marginTop: 10,
  },
  list: {
    flexGrow: 1,
  },
});

export default HomeScreen;
