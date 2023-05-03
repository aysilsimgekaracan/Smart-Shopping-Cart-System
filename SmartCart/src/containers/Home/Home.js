// import styles from "./style"
import { ListItem, Text, Avatar } from "@react-native-material/core"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const data = [
  { id: '1', color: ['#5B247A', '#1BCEDF'], description: 'Lorem Ipsum 1' },
  { id: '2', color: ['#184E68', '#57CA85'], description: 'Lorem Ipsum 2' },
  { id: '3', color: ['#F7B733', '#FC4A1A'], description: 'Lorem Ipsum 3' },
  { id: '4', color: ['#FC4A1A', '#F7B733'], description: 'Lorem Ipsum 4' }
]

export function HomeContainer({ products }) {

  const renderItem = ({ item }) => (
    <LinearGradient style={styles.itemContainer} colors={item.color}>
      <Text style={styles.itemText}>{item.description}</Text>
    </LinearGradient>
  )

  return (
    <SafeAreaView >
      <Text variant='h3' >Home</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      <>
        <Text variant='h5' >Products</Text>
        {products.map(product => {
          return (
            <ListItem
              leadingMode="image"
              leading={
                <Avatar image={{ uri: product.image }} />
              }
              key={product.id}
              title={product.name}
              secondaryText={product.description}
              trailing={props => (
                <Text variant="caption" {...props} style={{ fontSize: 10 }}>
                  {product.price}TL
                </Text>
              )}
            />)

        })}
      </>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
})
