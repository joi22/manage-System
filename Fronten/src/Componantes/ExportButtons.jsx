import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';

const ExportButtons = () => {
    const { user } = useContext(UserContext); // <-- Assuming you store userId

    const downloadFile = async (type) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/reports/${type}?userId=${user?._id}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            console.log(res,"=======___")
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `fitness-report.${type}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Download failed', error);
        }
    };

    return (
        <div className="flex gap-4 mt-4">
            <button onClick={() => downloadFile('pdf')} className="px-4 py-2 bg-white text-[#e60076] rounded font-semibold hover:bg-gray-200 transition">
                Export PDF
            </button>
            <button onClick={() => downloadFile('csv')} className="px-4 py-2 bg-white text-[#e60076] rounded font-semibold hover:bg-gray-200 transition">
                Export CSV
            </button>
        </div>
    );
};

export default ExportButtons;
