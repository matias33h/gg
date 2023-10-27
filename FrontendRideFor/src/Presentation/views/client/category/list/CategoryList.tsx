import React, { useEffect } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { ClientCategoryItem } from './Item';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { Category } from '../../../../../Domain/entities/Category';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientCategoryListScreen'> {}

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
  const { categories, getCategories } = useViewModel();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    getCategories();
  }, []);

  const renderItem = ({ item }: { item: Category }) => (
    <ClientCategoryItem category={item} width={width - 20} navigation={navigation} />
  );

  return (
    <View style={{ }}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id!}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

