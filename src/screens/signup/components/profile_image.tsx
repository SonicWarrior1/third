import React, {useState} from 'react';
import {Pressable, Image, Text, Modal} from 'react-native';
import style from '../styles';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  CameraOptions,
  launchCamera,
} from 'react-native-image-picker';

function ProfileImage({
  image,
  setImage,
  
}: Readonly<{
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string>>;
 
}>) {
  const [cameraSheet, setCameraSheet] = useState(false);
  const openImagePicker = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    let response = await launchImageLibrary(options);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else {
      let imageUri = response.assets![0].uri;
      console.log(imageUri);
      setImage(imageUri!);
      setCameraSheet(false);
    }
  };
  const openCamera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };
    let response = await launchCamera(options);
    console.log(response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else {
      let imageUri = response.assets![0].uri;
      setImage(imageUri!);
      setCameraSheet(false);
    }
  };
  return (
    <>
      <Modal
        transparent={true}
        visible={cameraSheet}
        onRequestClose={() => {
          setCameraSheet(false);
        }}
        animationType="slide">
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            setCameraSheet(false);
          }}>
          <Pressable style={style.bottomSheet} onPress={() => {}}>
            <Pressable style={style.sheetButton} onPress={openImagePicker}>
              <Text>Gallery</Text>
            </Pressable>
            <Pressable style={style.sheetButton} onPress={openCamera}>
              <Text>Camera</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <Pressable
        style={style.imageButton}
        onPress={() => {
          setCameraSheet(true);
        }}>
        <Image
          source={
            image ? {uri: image} : require('../../../assets/images/profile.png')
          }
          style={style.image}
        />
      </Pressable>
      {image === undefined  && (
        <Text style={[style.error, {alignSelf: 'center'}]}>
          Please Upload an Image
        </Text>
      )}
    </>
  );
}

export default ProfileImage;
