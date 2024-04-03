import styled from "styled-components/native";

export const OTPInputContainer = styled.View`
  margin-top: 32px;
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
  border-color: #EAEAEA;
  border-width: 2px;
  border-radius: 5px;
  padding: 12px;
  min-width: 50px;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #101010;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: #555;
  background-color: #EAEAEA;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #000000;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;