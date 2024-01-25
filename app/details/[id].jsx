import {
  Stack,
  Tabs,
  Link,
  router,
  useNavigation,
  useRouter,
  useLocalSearchParams,
  useSearchParams,
} from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
} from "../../constants/contants";

export default function details({ route }) {
  const navigation = useNavigation();
  const item = useLocalSearchParams();

  const isPresented = router.canGoBack();
  console.log(item);
  return (
    <>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />

      <View>
        <Text>Modal Screen</Text>

        <Text style={{ color: "red" }}>
          {item.id} {item.name}
        </Text>
      </View>
    </>
  );
}
