import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';
import { Category } from '../../../../../Domain/entities/Category';
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../Domain/entities/Product';
import { ResponseApiDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';

const AdminProductUpdateViewModel = (product: Product, category: Category) => {

    const [values, setValues] = useState(product);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>()
    const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>()
    const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>()
    const { update, updateWithImage } = useContext(ProductContext);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const updateProduct = async () => {
        console.log('PRODUCTO FORMULARIO: ' + JSON.stringify(values))
        var files = [];
        files.push(file1!);
        files.push(file2!);
        files.push(file3!);

         setLoading(true);
        var response = {} as ResponseApiDelivery;
        if (values.image1.includes('https://') && values.image2.includes('https://') && values.image3.includes('https://')) {
             response = await update(values);
        } 
        else {
            response = await updateWithImage(values, files);
        }


         setLoading(false);
         setResponseMessage(response.message);
         
         
    }

    const pickImage = async (numberImage: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {

            if (numberImage == 1) {
                onChange('image1', result.assets[0].uri); // file://ksdajkaskj.png
                setFile1(result.assets[0]);
            }

            else if (numberImage == 2) {
                onChange('image2', result.assets[0].uri); // file://ksdajkaskj.png
                setFile2(result.assets[0]);
            }

            else if (numberImage == 3) {
                onChange('image3', result.assets[0].uri); // file://ksdajkaskj.png
                setFile3(result.assets[0]);
            }
           
        }
    }
    
    const takePhoto = async (numberImage: number) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            if (numberImage == 1) {
                onChange('image1', result.assets[0].uri); // file://ksdajkaskj.png
                setFile1(result.assets[0]);
            }

            else if (numberImage == 2) {
                onChange('image2', result.assets[0].uri); // file://ksdajkaskj.png
                setFile2(result.assets[0]);
            }

            else if (numberImage == 3) {
                onChange('image3', result.assets[0].uri); // file://ksdajkaskj.png
                setFile3(result.assets[0]);
            }
        }
    }

    

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        updateProduct,
        loading,
        responseMessage
    }
}

export default AdminProductUpdateViewModel;