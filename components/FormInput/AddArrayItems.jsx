'use client';

import { Plus, Tag, X } from "lucide-react";
import React, { useState } from "react";

const AddArrayItems = ({items=[], setItems, itemTitle}) => {
  const [itemText, setItemText] = useState("");
  const [showItemForm, setshowItemForm] = useState(false);

  const addItem = () => {
    if (itemText) {
      setItems([...items, itemText]);
      setItemText("");
    }
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  return (
    <div className="sm:col-span-2">
      {showItemForm ? (
        <div class="flex items-center max-w-lg mx-auto mt-2">
          <label for="add-items" class="sr-only">
            Add {itemTitle}
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Tag className="text-blue-600" />
            </div>
            <input
              type="text"
              id="add-items"
              value={itemText}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Create a ${itemTitle}...`}
              onChange={(e) => setItemText(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={addItem}
            class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Plus className="w-4 h-4 me-2" />
            Add
          </button>
          <button
            onClick={() => setshowItemForm(false)}
            className="ml-3 shrink-0 p-2 bg-red-400 rounded-lg flex items-center justify-center "
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <button
          className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 py-2 px-4 rounded-lg"
          onClick={() => setshowItemForm(true)}
        >
          <Plus />
          <span>Add {itemTitle}</span>
        </button>
      )}
      {items && (
        <div className="flex flex-wrap gap-4 mt-4">
          {items?.map((item, i) => (
            <div
              className="flex space-x-2 items-center justify-between bg-slate-200 dark:bg-slate-600 px-4 py-2 text-slate-800 dark:text-slate-50 rounded-lg cursor-pointer"
              key={i}
            >
              <Tag className="w-5 h-5 text-blue-400" />
              <p className="capitalize text-balance">{item}</p>
              <button onClick={() => removeItem(i)}>
                <X className="w-5 h-5 text-red-400 hover:text-red-700 rounded-full" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddArrayItems;
