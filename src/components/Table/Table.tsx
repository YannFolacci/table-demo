"use client";

import { useState, useEffect } from "react";
import Item from '../Item/Item';
import Filter from '../Filter/Filter';

export default function Table(props) {

    const [tableHeaders, setTableHeaders] = useState({});
    const [filter, setFilter] = useState({});
    const [objets, setObjets] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        fetch('/api/filters')
        .then((res) => res.json())
        .then(setTableHeaders)
        .catch((err) => console.error('Erreur filtre :', err));

        onFilterChange('')
    }, []);


    const handleSelect = (id) => {
        setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };


    const isAllSelected = selectedItems.length === Object.keys(objets).length;

    const selectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(objets.map((item) => item.serialNumber));
        }
    };

    const onFilterChange = (newFilter) => {
        setSelectedItems([])
        setFilter(newFilter)
        console.log(`api call : /api/objets?${newFilter}`)
        fetch(`/api/objets?${newFilter}`)
          .then((res) => res.json())
          .then(data => {
            console.log("Objets récupérés :", data);
            setObjets(data);})
          .catch((err) => console.error('Erreur objets :', err));
      };

    return (
        <>
            <div className='w-full px-4 py-2 bg-gray-100 flex justify-between items-center'>
                <h1 >Génération des Certificats</h1>
                <button onClick={() => setShowPopup(true)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Générer le certificat</button>
            </div>
            <Filter onFilterChange={onFilterChange}/>
            <table className='w-full text-left table-auto min-w-max'>
                <thead className='text-xs text-gray-700 border-0 border-b-2 border-gray-200'>
                    <tr>
                        <th className='flex px-6 py-3 w-fit truncate'><input type="checkbox" onChange={selectAll} className="px-6 py-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"/></th>
                        {
                            Object.entries(tableHeaders).map(([filterkey, value]) => (
                            <th key={filterkey} className='px-6 py-3'>{filterkey}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                         objets.map((item) => (
                                <Item 
                                    item={item} 
                                    isSelected={selectedItems.includes(item.serialNumber)}
                                    key={item.serialNumber}  
                                    onToggle={() => handleSelect(item.serialNumber)}
                                />
                         ))
                    }
                </tbody>
            </table>
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 flex flex-col items-center justify-center">
                        <h2 className="text-xl font-bold mb-4">Certificats Générés</h2>
                        <ul>
                            {
                                selectedItems.map((item)=>(
                                    <li>numéro de série : {item}</li>
                                ))
                            }
                        </ul>
                        <button
                        onClick={() => setShowPopup(false)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        >
                        Fermer
                        </button>
                    </div>
                </div>
            )}
            <div> Il y a {selectedItems.length} éléments sélectionnés.</div>
        </>
    )
}