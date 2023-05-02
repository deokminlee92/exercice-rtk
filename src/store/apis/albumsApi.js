import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      // remove for production
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      //삭제
      // 우리가 필요한 정보는 album.id
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          console.log(album);
          return [{ type: "Album", id: album.userId }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      // mmutation() -> data change 라는 것 알아 봄
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      // fetchAlbums 은 템플릿 이름으로 사용됨
      // 후크 네임이 무엇인지? => albumsApi.useFetchAlbumsQuery()
      fetchAlbums: builder.query({
        // 내 맘대로 태그 추가
        providesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
