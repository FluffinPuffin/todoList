import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, Button } from 'react-native';
import { CheckBox } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 18,
    padding: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
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
      completed: false,
      description: "Description2"
    },
    {
      key: 3,
      completed: false,
      description: "Description3"
    },
    {
      key: 4,
      completed: false,
      description: "Description4"
    },
    {
      key: 5,
      completed: false,
      description: "Description5"
    }
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleCompleted = (key) => {
    const newData = data.map(item => {
      if (item.key === key) {
        item.completed = !item.completed;
      }
      return item;
    });
    setData(newData);
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newKey = data.length ? data[data.length - 1].key + 1 : 1;
      const newData = [...data, { key: newKey, completed: false, description: newTask }];
      setData(newData);
      setNewTask('');
    } else {
      console.log("Task description cannot be empty");
    }
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}