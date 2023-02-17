import { gql } from '@apollo/client';

export const GET_BOOKMARKS = gql`
  query Bookmarks($first: Int, $after: Int, $last: Int, $before: Int, $tag: String) {
    bookmarks(first: $first,after: $after,last: $last,before: $before, tag: $tag) {
      bookmarks {
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
      pageMeta {
        nextCursor
        maxCursor
      }
    }
    tags {
        name
        count
    }
  }
`;

export const GET_TAGS = gql`
  query Tags {
    tags {
        name
        count
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