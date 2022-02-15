import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Appbar} from 'react-native-paper';

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
          uri: props.data.show.image.medium,
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
          {props.data.show.name}
        </Text>
        <Text style={{color: 'white', fontSize: 12, paddingBottom: 6}}>
          {props.data.show.summary.replace(/<\/?[^>]+(>|$)/g, '')}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function Getdata() {
    try {
      const responce = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const res = JSON.parse(await responce.text());
      setData(res);
      setLoading(false);
      // console.log('Responce', res);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Getdata();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <>
        <Appbar.Header
          style={{
            backgroundColor: 'black',
          }}>
          <Appbar.Content color="red" title="Cloud-Flix" />
          <Appbar.Action
            icon="magnify"
            onPress={() => navigation.navigate('SearchScreen')}
          />
        </Appbar.Header>
        <View
          style={{
            width: '100%',
            height: '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      </>
    );
  }
  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: 'black',
        }}>
        <Appbar.Content color="red" title="Cloud-Flix" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </Appbar.Header>
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
            <MovieCard data={d} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
