import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PostingCard from "../components/home/PostingEntry";
import AdPopup from "../components/home/AdPopup";
import { ImageSwiper } from "../components/home/AdSwiper";
import { BACKGROUND_LIGHT } from "../constants/colors";
import { AD_SLIDESHOW_DATA, POSTING_DATA } from "../data/dummy_postings";

const renderPosting = ({ item }) => {
  return (
    <PostingCard name={item.title} details={item.body} source={item.imgSrc} />
  );
};

// TODO Fetching data of company postings
const fetchPostingData = () => {
  return POSTING_DATA;
};

// TODO Fetching ads (Company ads? Playstore ads?)
const fetchAdSlideshowData = () => {
  return AD_SLIDESHOW_DATA;
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
    <View style={styles.screen}>
      <AdPopup
        visible={adVisible}
        source={fetchAdPopup()}
        onPress={closeAdPopup}
        animationType="fade"
      >
        <Text>ok</Text>
      </AdPopup>
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
