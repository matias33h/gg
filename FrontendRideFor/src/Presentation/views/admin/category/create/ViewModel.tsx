  import React, { useState, useContext, useEffect } from 'react'
  import * as ImagePicker from 'expo-image-picker';
  import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
  import { CategoryContext } from '../../../../context/CategoryContext';
  import { UserContext } from '../../../../context/UserContext';

  const AdminCategoryCreateViewModel = () => {

      const [values, setValues] = useState({
          name: '',
          description: '',
          image: '',
          email: '',
          phone: '',
          refPoint: '',
          lat:0.0,
          lng:0.0,
          id_user:''
      });
      const [responseMessage, setResponseMessage] = useState('');
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
      const { create } = useContext(CategoryContext);
      const { user,saveUserSession,getUserSession} = useContext(UserContext);

      const onChange = (property: string, value: any) => {
          setValues({ ...values, [property]: value });
      }

      const onChangeRefpoint = (refpoint:string, lat:number,lng:number) => {
        setValues({ ...values, refPoint:refpoint, lat:lat, lng: lng});
    }

      useEffect(() => {
        
        if(user.id!=''){
            onChange('id_user',user.id)
        }
    }, [user])


      const createCategory = async () => {
          setLoading(true);
          const response = await create(values, file!);
          setLoading(false);
          setResponseMessage(response.message);
          if(response.success){
            resetForm();
          await saveUserSession(user)
          getUserSession()
          }
      }

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

      const resetForm = async () => {
          setValues({
              name: '',
              description: '',
              image: '',
              email: '',
              phone: '',
              refPoint: '',
              lat:0.0,
              lng:0.0,
              id_user:user.id!,
          })
      }

      return {
          ...values,
          onChange,
          onChangeRefpoint,
          takePhoto,
          pickImage,
          createCategory,
          loading,
          responseMessage
      }
  }

  export default AdminCategoryCreateViewModel;