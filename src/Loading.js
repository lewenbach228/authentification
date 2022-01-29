import React from "react";
import { View, Text } from "react-native";
import { FAB } from "react-native-elements";

export default () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 5,
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "black", paddingVertical: 10 , fontSize : 18}}>
          Chargement en cours
        </Text>
        <FAB
          loading
          visible={visible}
          icon={{ name: "add", color: "white" }}
          size="small"
        />
      </View>
    </>
  );
};
