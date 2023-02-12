import { gql } from '@apollo/client';

export const GET_BOOKMARKS = gql`
  query Bookmarks($tag: String) {
    bookmarks(tag: $tag) {
      readlater
      annotations
      tags {
        name
      }
      comments
      user
      shared
      url
      createdAt
      desc
      updatedAt
      title
    }
    tags {
        name
    }
  }
`;


export const CREATE_BOOKMARK_MUTATION = gql`
  mutation CreateBookmark($url: String!, $title: String!, $desc: String!, $tags: [String!]!) {
      createBookmark(url: $url, title: $title, desc: $desc, tags: $tags)
  }
`;

export const UPDATE_BOOKMARK_MUTATION = gql`
  mutation MyMutation($url: String!, $tags: [String!]!) {
      updateBookmark(url: $url, tags: $tags)
  }
`;