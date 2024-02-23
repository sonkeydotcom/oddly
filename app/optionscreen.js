// CategoryScreen.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const OptionScreen = () => {
  const route = useRoute();
  const { option } = route.params;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch categories based on the selected option
    const fetchOptions = async () => {
      // Dummy logic to fetch categories, replace with actual fetch logic
      const fetchedOptions =
        option === "Option 1"
          ? ["Category A", "Category B"]
          : ["Category X", "Category Y"];
      setOptions(fetchedOptions);
    };
    fetchOptions();
  }, [option]);

  return (
    <View>
      <Text>Categories for {option}:</Text>
      {options.map((category) => (
        <Text key={category}>{category}</Text>
      ))}
    </View>
  );
};

export default OptionScreen;
