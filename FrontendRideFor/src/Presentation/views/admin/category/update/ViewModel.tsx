import React, { useState, useContext, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { UpdateCategoryUseCase } from '../../../../../Domain/useCases/category/UpdateCategory';
import { UpdateWithImageCategoryUseCase } from '../../../../../Domain/useCases/category/UpdateWithImageCategory';
import { Category } from '../../../../../Domain/entities/Category';
import { ResponseApiDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';
import { CategoryContext } from '../../../../context/CategoryContext';
import { UserContext } from '../../../../context/UserContext';

const AdminCategoryUpdateViewModel = (category: Category) => {

    const [values, setValues] = useState(category);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const { update, updateWithImage } = useContext(CategoryContext);
    const { user, getUserSession, saveUserSession } = useContext(UserContext)

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

   

  useEffect(() => {
    if(user.id!=''){
        onChange('id_user',user.id)
    }
}, [user])

    const updateCategory = async () => {
        setLoading(true);
        let response = {} as ResponseApiDelivery;
        if (values.image?.includes('https://')) { // ACTUALIZAR SIN IMAGEN
            response = await update(values);
        }
        else { // ACTUALIZAR CON IMAGEN
            response = await updateWithImage(values, file!);
        }
        setLoading(false);
        setResponseMessage(response.message);
        await saveUserSession(user)
         getUserSession()
    }

       // voy a crear un método para seleccionar una imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // voy  a utilizar el método onChange para establecerle la ruta a la imagen
      // al campo image le paso result.uri
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

    
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          // voy  a utilizar el método onChange para establecerle la ruta a la imagen
          // al campo image le paso result.uri
          onChange('image', result.assets[0].uri);
          setFile(result.assets[0]);
        }
      };

    
    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        updateCategory,
        loading,
        responseMessage
    }
}

export default AdminCategoryUpdateViewModel;