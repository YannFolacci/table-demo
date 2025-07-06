import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Filter({ onFilterChange }) {
    const searchParams = useSearchParams();
    const [createFilters, setCreateFilters] = useState({});
    const [filters, setFilters] = useState({});

    useEffect(() => {
    fetch('/api/filters')
      .then((res) => res.json())
      .then(data => {
      setCreateFilters(data);})
      .catch((err) => console.error('Erreur filtre :', err));
  }, []);

    const handleChange = (field, value) => {
        const newFilters = {
        ...filters,
        [field]: value,
        };

        setFilters(newFilters);

        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, val]) => {
        if (val) params.set(key, val);
        });

        if (onFilterChange) {
            console.log(params.toString())
        onFilterChange(params);
        }
    };

    return (
        <ul className='flex items-center justify-between w-full text-xs text-gray-700 border-0 border-b-2 border-gray-400 px-4 py-2'>
            {Object.entries(createFilters).map(([filterkey, value]) => (
                <li key={filterkey} className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 capitalize">{filterkey}</label>
                <select
                    className="py-1 px-2 border rounded text-sm"
                    onChange={(e) => handleChange(filterkey, e.target.value)}
                    defaultValue=""
                >
                    <option value="">-- Tous --</option>
                    {value.map((val, i) => (
                    <option key={i} value={val}>
                        {val?.toString()}
                    </option>
                    ))}
                </select>
                </li>
            ))}
        </ul>
    )
}