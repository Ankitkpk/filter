import React, { useEffect, useState } from 'react';

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  // The initial value passed to useState is an empty array
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt"
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();
        // Get unique categories using Set data structure
        const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));
        setCategories(uniqueCategories); // Update state with unique categories
        console.log(uniqueCategories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Dependency array to ensure it runs only once

  return (
    <div className="w-64 p-5">
      <h1 className="font-bold text-3xl mb-10 mt-5">React Store</h1>
      <section>
        <input type="text" className="border w-full mb-4 p-2" placeholder="Product search" />
      </section>
      <div className="flex justify-center items-center mb-4">
        <input type="text" className="border-2 rounded-sm w-full" placeholder="Min" />
        <input type="text" className="border-2 rounded-sm w-full"  placeholder="Max" />
      </div>
     <div className='mb-5'>
        <h2 className='font-semibold text-xl mb-3'>categories</h2>

     </div>
  <section>
    {categories.map((category,index)=>(
        <label key={index} className='block mb-2'>
            <input type="radio"  name="category" value={category} className='mr-2 w-[16px] h-[16px]'/>
            {category.toUpperCase()}
        </label>
    ))

    }
    </section>
   
    <div className='mb-5 mt-4'>
        <h2 className='font-semibold text-xl mb-3'>keywords</h2>
        {keywords.map((keyword, index) => (
  <button
 key={index}
 type="button"
 name="keyword"
 value={keyword}
 className="block rounded-lg text-gray-600 hover:text-gray-800 text-left p-2 mr-2 mb-2 bg-gray-100 hover:bg-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
>
 {keyword.toUpperCase()}
</button>

))}

     </div>
      <button className="bg-black text-white rounded px-6 py-4">
     Reset Button
    </button>
    </div>
  );
};

export default Sidebar;
