<template>
  <div>
    <hero />

    <!--  Search  -->
    <div class="container search">
      <input
        v-model.lazy="searchString"
        placeholder="Search"
        type="text"
        @keyup.enter="$fetch"
      />
      <button v-show="searchString" class="button" @click="clearSearch">
        Clear Search
      </button>
    </div>

    <!--  Loading  -->
    <loading v-if="$fetchState.pending" />

    <!--  Movies  -->
    <div v-else class="container movies">
      <!--   Searched movies   -->
      <div v-if="searchedMovies.length" class="movies-grid">
        <div v-for="movie in searchedMovies" :key="movie.id" class="movie">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.original_title"
            />

            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>

          <div class="info">
            <p class="title">
              {{ movie.title | movieShortTitle }}
              <span v-if="movie.title.length > 25">...</span>
            </p>

            <p class="release">
              Released: {{ movie.release_date | dateToLocale }}
            </p>

            <NuxtLink
              class="button button-light"
              :to="{
                name: 'movies-slug',
                params: { slug: movie.id },
              }"
              >Get More Info
            </NuxtLink>
          </div>
        </div>
      </div>
      <!--   Initial movies   -->
      <div v-else class="movies-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.original_title"
            />

            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>

          <div class="info">
            <p class="title">
              {{ movie.title | movieShortTitle }}
              <span v-if="movie.title.length > 25">...</span>
            </p>

            <p class="release">
              Released: {{ movie.release_date | dateToLocale }}
            </p>

            <NuxtLink
              class="button button-light"
              :to="{
                name: 'movies-slug',
                params: { slug: movie.id },
              }"
              >Get More Info
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hero from '@/components/TheHero'
import loading from '@/components/TheLoading'

export default {
  components: {
    hero,
    loading,
  },
  data: () => ({
    movies: [],
    searchedMovies: [],
    searchString: '',
  }),
  async fetch() {
    if (!this.searchString) {
      await this.getMovies()
      return
    }

    await this.searchMovies()
  },
  head: () => ({
    title: 'Movie App — Latest Streaming Movies Info',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Get all the latest streaming movies in cinema and online'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'movies, stream, cinema, streaming'
      }
    ],
  }),
  fetchDelay: 1000,
  methods: {
    async getMovies() {
      const data = await this.$axios.get(
        `/movie/now_playing?api_key=${process.env.apiKey}&language=en-US`
      )

      this.movies = data.data.results
    },
    async searchMovies() {
      const data = await this.$axios.get(
        `/search/movie?api_key=${process.env.apiKey}&language=en-US&page=1&query=${this.searchString}`
      )

      this.searchedMovies = data.data.results
    },
    clearSearch() {
      this.searchString = ''
      this.searchedMovies = []
    },
  },
}
</script>

<style lang="scss" scoped>
.loading {
  align-items: flex-start;
  padding-top: 120px;
}

.search {
  display: flex;
  padding: 32px 16px;

  input {
    max-width: 350px;
    width: 100%;
    padding: 12px 6px;
    font-size: 14px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.movies {
  padding: 32px 16px;

  .movies-grid {
    display: grid;
    column-gap: 32px;
    row-gap: 64px;
    grid-template-columns: 1fr;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 750px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1100px) {
      grid-template-columns: repeat(4, 1fr);
    }

    .movie {
      position: relative;
      display: flex;
      flex-direction: column;

      .movie-img {
        position: relative;
        overflow: hidden;

        &:hover {
          .overview {
            transform: translateY(0);
          }
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
        }

        .review {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background-color: #c92502;
          color: #fff;
          border-radius: 0 0 16px 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .overview {
          line-height: 1.5;
          position: absolute;
          bottom: 0;
          background-color: rgba(201, 38, 2, 0.9);
          padding: 12px;
          color: #fff;
          transform: translateY(100%);
          transition: 0.3s ease-in-out all;
        }
      }

      .info {
        margin-top: auto;

        .title {
          margin-top: 8px;
          color: #fff;
          font-size: 20px;
        }

        .release {
          margin-top: 8px;
          color: #c9c9c9;
        }

        .button {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
