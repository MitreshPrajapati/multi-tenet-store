import NewMarketForm from '@/components/be/NewMarketForm'
import { getData } from '@/lib/getData';

const NewMarket = async() => {
  const categoriesData = await getData("categories");
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });

console.log("from market page",categories)
  return (
    <NewMarketForm categories={categories} />
  )
}

export default NewMarket;