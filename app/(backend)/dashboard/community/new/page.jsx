import NewTraningForm from '@/components/be/NewTraningForm'
import { getData } from '@/lib/getData';
import React from 'react'

const NewTraning = async() => {
  const categoriesData = await getData("categories");
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  return (
    <NewTraningForm categories={categories} />
  )
}

export default NewTraning