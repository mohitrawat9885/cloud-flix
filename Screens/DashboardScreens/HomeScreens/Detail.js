import React from 'react';
import {ReactDOM} from 'react';
import {Markup} from 'interweave';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Appbar, TouchableRipple} from 'react-native-paper';

// const summ = React.createElement(
//   <p>
//     <b>Jiva!</b> is a fun and energy-packed drama series that follows the life
//     of the talented street dancer Ntombi, who while juggling the demands of a
//     dead end job, family responsibility and a rocky love life realises that her
//     dance moves could be her ticket out of her working class neighbourhood in
//     Durban. But first, she must overcome her fears, beat her rivals and sort out
//     the chaos that is her family.
//   </p>,
// );

export default function DetailScreen({route, navigation}) {
  const articleContent =
    "<p><b>Lorem ipsum dolor laboriosam.</b> </p><p>Facere debitis impedit doloremque eveniet eligendi reiciendis <u>ratione obcaecati repellendus</u> culpa? Blanditiis enim cum tenetur non rem, atque, earum quis, reprehenderit accusantium iure quas beatae.</p><p>Lorem ipsum dolor sit amet <a href='#testLink'>this is a link, click me</a> Sunt ducimus corrupti? Eveniet velit numquam deleniti, delectus  <ol><li>reiciendis ratione obcaecati</li><li>repellendus culpa? Blanditiis enim</li><li>cum tenetur non rem, atque, earum quis,</li></ol>reprehenderit accusantium iure quas beatae.</p>";

  const movie = route.params.data;
  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: 'black',
        }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content color="red" title={route.params.data.show.name} />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </Appbar.Header>
      <ScrollView
        style={{
          width: '100%',
          // display: 'flex',
          // justifyContent: 'center',
          padding: 10,
        }}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: '94%',
              height: 500,
            }}
            source={{
              uri: movie.show.image ? movie.show.image.original : ' ',
            }}
          />
        </View>

        <View
          style={{
            width: '100%',
            padding: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              marginTop: 10,
              // marginLeft: 4,
            }}>
            {movie.show.name ? movie.show.name : ''}
          </Text>
          <Text style={{color: 'white', fontSize: 20}}>Summary</Text>
          <Text style={{color: 'white', fontSize: 15}}>
            {movie.show.summary
              ? movie.show.summary.replace(/<\/?[^>]+(>|$)/g, '')
              : ''}
          </Text>
          <View
            style={{
              marginTop: 20,
            }}>
            <Text style={{color: 'white'}}>Type: {movie.show.type}</Text>
            <Text
              style={{
                color: 'white',
              }}>
              Language:{' '}
              {movie.show.language ? movie.show.language : 'Not Mentioned!'}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'white'}}>Genres: </Text>

              {movie.show.genres.map((d, i) => (
                <Text key={i} style={{color: 'white'}}>
                  {d}
                  {','}
                </Text>
              ))}
            </View>
            <Text style={{color: 'white'}}>
              Premiered: {movie.show.premiered ? movie.show.premiered : ''}
            </Text>
            <Text style={{color: 'white'}}>
              Ended: {movie.show.ended ? movie.show.ended : 'Not Yet'}
            </Text>
            <Text style={{color: 'white'}}>
              Status: {movie.show.status ? movie.show.status : ''}
            </Text>
            <Text style={{color: 'white'}}>
              Rating:{' '}
              {movie.show.rating.average
                ? movie.show.rating.average
                : 'No Ratings'}
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: 'white', fontSize: 20}}>Schedule</Text>
            <Text style={{color: 'white'}}>
              Time: {movie.show.schedule.time ? movie.show.schedule.time : ' '}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'white'}}>Days: </Text>
              {movie.show.schedule.days.map((d, i) => (
                <Text key={i} style={{color: 'white'}}>
                  {d}
                </Text>
              ))}
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <Text style={{color: 'white', fontSize: 18}}>
              Web Channel:{' '}
              {movie.show.webChannel ? movie.show.webChannel.name : 'Not found'}
            </Text>
            <Text style={{color: 'white', fontSize: 18}}>
              Country:{' '}
              {movie.show.webChannel
                ? movie.show.webChannel.country
                  ? movie.show.webChannel.country.name
                  : 'Not found'
                : 'Not found'}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              marginTop: 40,
              marginBottom: 100,
              padding: 3,
            }}
            onPress={() =>
              movie.show.officialSite
                ? Linking.openURL(movie.show.officialSite)
                : alert('Opps ! Link not found')
            }>
            <Text
              style={{
                color: 'white',
                fontSize: 19,
              }}>
              Go To Official Site
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
