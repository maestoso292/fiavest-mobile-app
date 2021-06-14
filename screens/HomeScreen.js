import React, { useState } from "react";
import { View, Button, Text, StyleSheet, FlatList, Image } from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
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

export default HomeScreen;