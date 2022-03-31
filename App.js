import {AsyncStorage, Button, FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {ImageBackground, SafeAreaView} from "react-native-web";

export default function App() {
  const [photos, setPhotos] = useState(null);

//   A SINGLE PHOTO IS {
//         "albumId": 1,
//         "id": 2,
//         "title": "reprehenderit est deserunt velit ipsam",
//         "url": "https://via.placeholder.com/600/771796",
//         "thumbnailUrl": "https://via.placeholder.com/150/771796"
// }

  const renderItem = ({item}) => (
    <View key={item.key}
          style={styles.itemView}>
            <ImageBackground source={item.url} style={styles.itemPhoto}>
                <View style={styles.itemText}>
                    <Text>{item.title}</Text>
                </View>
            </ImageBackground>
    </View>
  );

  const useFetch = (url) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus('fetching');
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            console.log("i fetched images")
            setStatus('fetched');
        };

        fetchData();
    }, [url]);

    return { status, data };
  };


  const url = `https://jsonplaceholder.typicode.com/photos`;
  const { status, data } = useFetch(url);


  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/photos')
  //         .then(response => response.json()).then(json => {
  //             setPhotos(json);
  //         });
  // });


  return (
      <SafeAreaView>
          <View style={styles.titleView}>
              <Text style={styles.titleText}>
                  My Convergence Tech Assessment</Text>
          </View>
          <FlatList
              horizontal={true}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
          <View style={styles.container}>
              <Button style={styles.randomizeButton} title="Randomize"/>
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
