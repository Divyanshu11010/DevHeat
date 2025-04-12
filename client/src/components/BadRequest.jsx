import React from 'react';
import { AlertTriangle } from 'lucide-react';

function BadRequest() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <AlertTriangle size={48} className="text-red-500 mb-4" />
            <h1 className="text-2xl font-semibold">400 - Bad Request</h1>
            <p className="text-gray-500 mt-2">No data was provided. Please go back and try again.</p>
        </div>
    );
}

export default BadRequest;
