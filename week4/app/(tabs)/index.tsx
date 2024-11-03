import React from "react";
import { StyleSheet, View } from "react-native";

const FlexContainer = (props) => {
  return <View style={props.style}>{props.children}</View>;
};

const Lab = () => {
  return (
    <View style={stylesheet.container}>
      <FlexContainer style={stylesheet.header}>
        <View style={{ flex: 1, backgroundColor: "red" }} />
        <View style={{ flex: 1, backgroundColor: "green" }} />
        <View style={{ flex: 1, backgroundColor: "blue" }} />
      </FlexContainer>

      <View style={stylesheet.body}>
        <View style={stylesheet.box} />
        <View style={stylesheet.box} />
        <View style={stylesheet.box} />
        <View style={stylesheet.box} />
      </View>

      <FlexContainer style={stylesheet.footer}>
        <View style={{ flex: 1, backgroundColor: "red" }} />
        <View style={{ flex: 1, backgroundColor: "green" }} />
        <View style={{ flex: 1, backgroundColor: "blue" }} />
      </FlexContainer>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  body: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    borderColor: "black",
    borderRadius: 1,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "gray",
    margin: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 100,
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: "black",
  },
});

export default Lab;
