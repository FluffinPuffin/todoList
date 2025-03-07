import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { CheckBox } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  itemText: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  }
});

export default function App() {
  const [data, setData] = useState([
    {
      key: 1,
      completed: false,
      description: "Description1"
    },
    {
      key: 2,
      completed: true,
      description: "Description2"
    },
    {
      key: 3,
      completed: false,
      description: "Description3"
    },
    {
      key: 4,
      completed: true,
      description: "Description4"
    },
    {
      key: 5,
      completed: true,
      description: "Description5"
    }
  ]);

  const toggleCompleted = (key) => {
    const newData = data.map(item => {
      if (item.key === key) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
      return item;
    });
    setData(newData);
  };

  const renderItem = ({ item }) => {
    let itemStyle = styles.itemText;
    if (item.completed) {
      itemStyle = [styles.itemText, styles.completedText];
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleCompleted(item.key)}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon={'checkbox-blank-outline'}
        />
        <Text style={itemStyle}>
          {item.key}. {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
      />
    </SafeAreaView>
  );
}