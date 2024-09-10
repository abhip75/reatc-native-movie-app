import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';

const TMDB_API_KEY = '4567642bc845cb1c77f422770c82a29d'; // TMDB API Key
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images

const HomeScreen = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results); // Initial load shows all movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);

    // Filter movies based on search text
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>ENTERTAINMENT HUB</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay
          autoplayTimeout={3}
          dotStyle={styles.hiddenDot} // Hide the dots
          activeDotStyle={styles.hiddenDot} // Hide the active dot
        >
          {filteredMovies.map((movie) => (
            <View style={styles.slide} key={movie.id}>
              <Image
                source={{ uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` }}
                style={styles.image}
              />
              <Text style={styles.title}>{movie.title}</Text>
            </View>
          ))}
        </Swiper>
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={{ uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}` }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
              </View>
            </View>
            <View style={styles.voteContainer}>
              <Text style={styles.voteAverage}>{item.vote_average.toFixed(1)}</Text>
            </View>
          </View>
        )}
        numColumns={2} // Fixed number of columns
        columnWrapperStyle={styles.row} // Apply styles to the row of columns
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
    marginTop: 90,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: 200,
    marginBottom: 16,
  },
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
  },
  hiddenDot: {
    backgroundColor: 'transparent',
  },
  cardContainer: {
    flex: 1,
    margin: 8,
    position: 'relative',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    height: 290,
  },
  textContainer: {
    padding: 8,
    alignItems: 'center',
  },
  releaseDate: {
    fontSize: 10,
    color: '#666',
  },
  voteContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#0096FF',
    borderRadius: 12,
    padding: 4,
  },
  voteAverage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
