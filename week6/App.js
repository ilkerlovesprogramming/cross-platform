/*
Simplified explanation of how this Redux setup woprks in a React Native app step by step:
 
 
Actions:
Actions are just labels for changes we want to make . For example we have actions called INCREMENT and DECREMENT to increase or decrease the counter.
We create functions (increment and decrement) to make it easier to trigger these actions.
 
 
 
Reducer:
The reducer is a function that decided how the state changed based on actions.When it receives an action (like INCREMENT) it updates the count by
adding or substractiong from it. This is like the "decision maker" that controls the state updates.
 
 
Store:
The store is like a database that holds the apps current state. It uses the reducer to know how to update that state.
All components in the app can access and change the state stored here.
 
 
Provider: the provider gives the app access tho the Redux store, allowing all components inside it to see and modify the state. 
Think of it as making the store visible to the app.
 
 
Counter Components:
This is the main part of the UI where
**useSelector** reads the current count from the store and displays it.
**useDispatch** sends actions (increment or decrement) tot the store when you press the buttons.
When a button is pressed, **useDispatch** sends the action to the store, which uses the reducer to update count.
The new count is sent back to the component through **useSelector**, updating the displayed value.
 
 
useSelector and useDispatch exclusively created for Redux.
*/
 
 
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createStore} from 'redux';
 
 
//Action Types - Define specific actions we want the app to handle
// Here we define action types as constants to avoid typos and make the code easier to manage.
 
 
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
 
 
//Action Creators - Functions that return specific action objects for updating the state
//These actions are used to inform Redux about the type of change we want in the app.
const increment = () => ({type: INCREMENT });
const decrement = () => ({type: DECREMENT });
 
 
//Initial State - Defines the starting state of the app
//This is where we set the default values for state variables. Here, we start with count - 0;
const initialState = { count: 0};
 
 
//Reducer  - Handles state changes based on dispatched actions
//This function takes the current state and an action, then returns the new state.
//It follows a "pure function" principle, maning it always produces the same output for the same input.
 
 
const counterReducer = (state = initialState, action) => {
  switch(action.type){
    case INCREMENT:
      //When the INCREMENT action is dispatched, increase count by 1
      return { count:state.count + 1};
    case DECREMENT:
      //When the DECREMENT action is dispatched, decrease count by 1
      return { count:state.count - 1};
    default:
      //If the action type doesn't match, return the current state without changes
      return state;
  }
}
 
 
// Store - Creates the Redux store and sets up the reducer function to manage the state
// The store is the central location where the state is stored and managed in Redux.
const store = createStore(counterReducer);
 
 
const Counter = () => {
 
 
  // useSelector - Accesses the current value of 'count' from the Redux store.
  // The count value in the store is updated by the reducer based on dispatched actions.
  const count = useSelector((state) => state.count);
 
 
  // useDispatch - Allows sending actions (increment, decrement) to the Redux store
  // When these actions are dispatched, the store forwards them to reducer for processing.
  const dispatch = useDispatch();
 
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Counter</Text>
      
      {/* Display the current count value, updated based on the Redux store state*/}
      <Text style={styles.counter}>{count}</Text>
      
      <View style={styles.buttonContainer}>
        {/* Increase button - When clicked, dispatches the increment action to Redux*/}
        {/* This triggers the reducer to increase count, updating the state and re-rendering the UI*/}
        
        <TouchableOpacity
          style = {styles.button}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>Increase</Text>
        </TouchableOpacity>
        
        {/* Decrease button - When clicked, dispatches the decrease action to Redux*/}
        {/* This triggers the reducer to decrease count, updating the state and re-rendering the UI*/}
        
        <TouchableOpacity
          style = {styles.button}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>Decrease</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};
 
 
// App Component - Wraps the Counter component with the Redux Provider to connect the store
// Provider makes the Redux store avaliable to all components within the app.
// Without this wrapper, components wouldn't have access to the store.
 
 
const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
)
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counter: {
    fontSize: 60,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginHorizontal: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
 
 
export default App