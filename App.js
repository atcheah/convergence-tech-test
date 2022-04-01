import {AsyncStorage, Button, FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {ImageBackground, SafeAreaView} from "react-native-web";

export default function App() {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        caches.has('photos').then((result)=> {
            if (result) {
                caches.open('photos').then((cache) => {
                    cache.match("https://localhost:19006")
                        .then(response => response.json())
                        .then((data) => {
                            console.log(data);
                            setPhotos(data);
                        })
                })
            } else {
                caches.open('photos').then((cache) => {
                    fetch('https://jsonplaceholder.typicode.com/photos')
                        .then(response => response.json())
                        .then(data => {
                            console.log("put into cache");
                            cache.put("https://localhost:19006", new Response(JSON.stringify(data)));
                            setPhotos(data);
                        });
                })
            }
        })}, []);

    function randomize() {
        console.log('im bad at coding');
        // if (photos) {
        //     setPhotos(recursiveRandomization(array));
        // }
    }

    // const recursiveRandomization = (array) => {
    //     console.log(array);
    //     let rng = Math.floor(Math.random() * array.length)
    //     return array[rng] + (recursiveRandomization(array.slice(rng,1)));
    // }

    const renderItem = ({item}) => (
        <View key={item.key} style={styles.itemView}>
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
