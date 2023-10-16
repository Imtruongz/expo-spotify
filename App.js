import { StatusBar } from "react-native";
import Navigation from "./StackNavigator";

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar barStyle={"light-content"} />
    </>
  );
}
