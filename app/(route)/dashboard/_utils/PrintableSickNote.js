// PrintableSickNote.js
import React from 'react';
import moment from 'moment';

const PrintableSickNote = React.forwardRef((props, ref) => {
    const { sicknote } = props;

    return (
        <div ref={ref} className={'m-5 bg-blue-50 rounded-lg p-3'}>
            <div className={'text-center'}>
                <h2 className={'inline-block text-xl font-bold p-2 border-2 border-blue-50'}>Sick note</h2>
            </div>
            <div className="mt-5 flow-root rounded-lg border border-gray-100 py-3 shadow-sm bg-white">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.username}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Reason</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.reason}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Valid from</dt>
                        <dd className="text-gray-700 sm:col-span-2">{moment(sicknote.start).format('DD-MMM-YYYY')}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Ending on</dt>
                        <dd className="text-gray-700 sm:col-span-2">{moment(sicknote.end).format('DD-MMM-YYYY')}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Doctor</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.doctor_fullname}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Note</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.note}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
});

export default PrintableSickNote;
