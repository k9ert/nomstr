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



export const UPDATE_BOOKMARK_MUTATION = gql`
mutation MyMutation($url: String!, $tags: [String!]!) {
    updateBookmark(url: $url, tags: $tags)
}
`;