import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import moment from "moment";
import {Button} from "@/components/ui/button";
import PrintableSickNote from "@/app/(route)/dashboard/_utils/PrintableSickNote";


const DownloadSickNote = ({ sicknote, daysLeft }) => {
    const componentRef = useRef();
    const originalTitle = document.title;

    const handleBeforePrint = () => {
        // Set the document title to the desired filename before printing
        document.title = `eDoktor-SickNote-${sicknote.username}-${moment(sicknote.end).format('YYYY-MMM-DD')}`;
    };
    const handleAfterPrint = () => {
        // Restore the original document title after printing
        document.title = originalTitle;
    };


    return (
        <div>
            <ReactToPrint
                trigger={() => <Button className={'hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out'}>Download document</Button>}
                content={() => componentRef.current}
                onBeforeGetContent={handleBeforePrint}
                onAfterPrint={handleAfterPrint}
            />
            <div style={{ display: 'none' }}>
                <PrintableSickNote ref={componentRef} sicknote={sicknote}/>
            </div>
        </div>
    );
};

export default DownloadSickNote;