import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {ImageBackground, SafeAreaView} from "react-native-web";

export default function App() {
    //  Photos is one of: null or array of JSON objects
    const [photos, setPhotos] = useState(null);
    // cacheName represents the name of the cache created to hold the response data
    const cacheName = 'photos';
    // url represents the destination of fetch request
    const url = 'https://jsonplaceholder.typicode.com/photos';
    // endpoint represents the url of web page
    const endpoint = 'https://localhost:19006';


    //  useEffect()
    //      params: none
    //      returns; none
    //      effects: photos
    //  useEffect checks for existing cache with cacheName, then whether cache exists:
    //   - opens cache and reads data into photos or,
    //   - fetches from url, sets the response to photos and caches the response
    useEffect(() => {
        caches.has(cacheName).then((result)=> {
            if (result) {
                caches.open(cacheName).then((cache) => {
                    cache.match(endpoint)
                        .then(response => response.json())
                        .then((data) => {
                            setPhotos(data);
                        })
                })
            } else {
                caches.open(cacheName).then((cache) => {
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            cache.put(endpoint, new Response(JSON.stringify(data)));
                            setPhotos(data);
                        });
                })
            }
        })}, []);

    //  randomize()
    //      params: none
    //      returns: none
    //      effects: photos
    // randomize checks if photo's has been retrieved yet, and if it has, calls recursive shuffle upon photos
    function randomize() {
        if (photos) {
            setPhotos(recursiveShuffle(photos));
        }
    }

    //  recursiveShuffle(array)
    //      params: Array []
    //      returns: Array []
    //      effects: none
    //  recursiveShuffle selects one random element to put to the front of the input array and calls itself
    //  again on the array with that element removed
    const recursiveShuffle = (array) => {
        if (array.length > 1) {
            let rng = Math.floor(Math.random() * array.length);
            return [array[rng]].concat(recursiveShuffle(array.slice(0,rng).concat(array.slice(rng+1,array.length))));
        } else {
            return array;
        }
    }

    //  renderItem({item})
    //      params: JSON object
    //      returns: JSX object
    //      effects: none
    //  renders the item or photo with associated style guidelines
    const renderItem = ({item}) => (
        <View key={item.key}>
            <ImageBackground source={item.url} style={styles.itemPhoto}>
                <View style={styles.itemText}>
                    <Text>{item.title}</Text>
                </View>
            </ImageBackground>
        </View>
    );

    return (
        <SafeAreaView>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>My Convergence Tech Assessment</Text>
            </View>
            <FlatList horizontal={true} data={photos} renderItem={renderItem} keyExtractor={item => item.id}/>
          <View style={styles.container}>
              <Button style={styles.randomizeButton} title="Randomize" onPress={randomize}/>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleView: {
        alignItems:'center'
    },
    titleText:{
        fontWeight:'bold'
    },
    itemPhoto: {
        width: 400,
        height:400,
        margin:10,
        borderColor: 'darkgrey',
        borderWidth:5,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 8,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
    },
    itemText: {
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate:'45deg'}]},
    randomizeButton: {
        padding:24
    }
});
