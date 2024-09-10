import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const TMDB_API_KEY = '4567642bc845cb1c77f422770c82a29d'; // TMDB API Key
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images



function TvScreen() {

  const [tv, setTv] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        setTv(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
        <Text style={styles.heading}>Entertainment Hub</Text>
      </View>
      <FlatList
        data={tv}
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
                <Text style={styles.releaseDate}>
                    Release Date: {item.release_date ? item.release_date : 'N/A'}
                </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
    marginTop: 90
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
  image: {
    width: '100%',
    height: 220, 
    resizeMode: 'cover', 
  },
  textContainer: {
    padding: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 12, 
    fontWeight: 'bold',
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
  }
});

export default TvScreen;