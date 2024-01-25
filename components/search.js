import { StyleSheet, Text, View } from "react-native";

const Search = () => {
  return (
    <View style={styles.search}>
      <Text> serach </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 5,

    padding: 12,
    borderRadius: 4,
    paddingHorizontal: 32,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
