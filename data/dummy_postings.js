import Posting from "../models/Posting";
import { customAlphabet } from "nanoid/non-secure";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 10);

const sampleBody =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";

const sampleSrc = [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree",
  "https://cdn.business2community.com/wp-content/uploads/2013/09/best-press-release-example.jpg",
  "https://en.pimg.jp/054/313/779/1/54313779.jpg",
  "https://secureservercdn.net/160.153.138.163/t55.c04.myftpupload.com/wp-content/uploads/2016/01/IB-Examples.jpg",
  "https://image.shutterstock.com/image-illustration/server-room-center-exchanging-cyber-260nw-784596430.jpg",
];

export const POSTING_DATA = [
    new Posting(nanoid(), "Something Happened", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "Another Thing Happened", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "WOW", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "Try Out This New Thing", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "Limited", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "Get This", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "App Update", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "New Terms and Conditions", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
    new Posting(nanoid(), "New Privacy Policy", sampleBody, sampleSrc[Math.floor(Math.random() * 8)]),
]

export const AD_SLIDESHOW_DATA = sampleSrc;