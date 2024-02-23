// OptionScreen.js
import React from "react";
import { View, Button } from "react-native";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const CategoryScreen = () => {
  const navigation = useNavigation();

  const handleOptionSelection = (option) => {
    router.push("optionscreen", { option });
  };

  return (
    <View>
      <Button
        title="Option 1"
        onPress={() => handleOptionSelection("Option 1")}
      />
      <Button
        title="Option 2"
        onPress={() => handleOptionSelection("Option 2")}
      />
    </View>
  );
};

export default CategoryScreen;
