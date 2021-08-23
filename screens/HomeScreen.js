import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PostingCard from "../components/home/PostingEntry";
import AdPopup from "../components/home/AdPopup";
import { ImageSwiper } from "../components/home/AdSwiper";
import { BACKGROUND_LIGHT } from "../constants/colors";
import { AD_SLIDESHOW_DATA, POSTING_DATA } from "../data/dummy_postings";

const renderPosting = ({ item }) => {
  return (
    <PostingCard name={item.title} details={item.body} source={item.img} url={item.url} />
  );
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
  const [postings, setPostings] = useState([]);
  const [adVisible, setAdVisible] = useState(true);

  const closeAdPopup = () => {
    setAdVisible(false);
  };

  const getPosting = async () => {
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/public/postings/fetch-postings",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData.error.message);
    } else {
      const ResData = await response.json()
      // console.log(ResData);
      return ResData;
    }
  }
  
  useEffect(() => {
    const getAllPost = async () => {
      const allPost = await getPosting();
      if(allPost) setPostings(allPost)
    };
    getAllPost()
  }, [])

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
          keyExtractor={(item) => item.postingId}
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
