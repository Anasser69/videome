import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handelChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (


      <View className="border-2 border-black-200 w-96 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          className=" text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder="Search For a Video Topic"
          placeholderTextColor="#7b7b8b"
          onChangeText={handelChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
      <TouchableOpacity>
        <Image
        source={icons.search} 
        className='w-5 h-5'
        resizeMethod="contain"
        />
      </TouchableOpacity>
      </View>
    
  );
};

export default SearchInput;
