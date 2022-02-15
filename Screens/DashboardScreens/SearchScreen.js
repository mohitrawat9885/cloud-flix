import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Searchbar} from 'react-native-paper';

function MovieCard(props) {
  return (
    <View
      style={{
        width: '100%',
        height: 260,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
      }}>
      <Image
        style={{
          width: '45%',
          height: 240,
        }}
        source={{
          uri: props.image,
        }}
      />
      <View
        style={{
          width: '55%',
          height: 230,
          paddingLeft: 12,
          paddingBottom: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            fontWeight: 'bold',
            marginLeft: 4,
          }}>
          {props.name}
        </Text>
        <Text style={{color: 'white', fontSize: 11, paddingBottom: 6}}>
          {props.summary}
        </Text>
      </View>
    </View>
  );
}

export default function SearchScreen({navigation}) {
  const [data, setData] = useState([]);
  const inputElement = useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  async function Getdata(query) {
    try {
      const responce = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`,
      );
      const res = JSON.parse(await responce.text());
      setData(res);
    } catch (err) {
      console.log(err);
    }
  }
  const onChangeSearch = query => {
    Getdata(query);
    setSearchQuery(query);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (inputElement.current) {
        inputElement.current.focus();
      }
    });
    return unsubscribe;
  }, [navigation]);

  function MoviesList() {
    if (data && data.length > 0) {
      return (
        <ScrollView
          style={{
            paddingLeft: 8,
            paddingRight: 8,
          }}>
          {data.map((d, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate('Detail', {
                  data: d,
                });
              }}>
              <MovieCard
                image={d.show.image ? d.show.image.medium : ' '}
                summary={
                  d.show.summary
                    ? d.show.summary.replace(/<\/?[^>]+(>|$)/g, '')
                    : ' '
                }
                name={d.show.name}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return <View></View>;
    }
  }
  return (
    <>
      <Searchbar
        ref={inputElement}
        iconColor="white"
        style={{
          backgroundColor: 'rgb(20 , 20,20)',
        }}
        autoFocus={true}
        color="white"
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <MoviesList />
    </>
  );
}
