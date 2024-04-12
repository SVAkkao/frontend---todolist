import React, { useEffect } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

function Day({ date, toggleJourneys, listdata, showDayIndex = true, hidden}) {
    const dayIndex = showDayIndex ? "第" + (getDayIndex(date) + 1) + "天" : '不在日期範圍內';

    function getDayIndex(date) {
        const startDate = new Date(listdata.start_date);
        const currentDate = new Date(date);
        const timeDifference = currentDate - startDate;
        const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return dayDifference;
    }

    const formattedDate = date.split('-').join('/'); // 將日期字串從 "YYYY-MM-DD" 轉換為 "YYYY/MM/DD"

    const icon = hidden ?  <FaAngleUp /> :<FaAngleDown />;

    return (
        <>
            <p onClick={() => toggleJourneys(date)} className='supportColor mt-2' style={{ color: (showDayIndex ? "" : "#FF5546") }}>{formattedDate} {dayIndex} {icon}</p>
            <hr onClick={() => toggleJourneys(date)} className='supportColor mb-2' style={{ color: (showDayIndex ? "" : "#FF5546") }} />
        </>
    );
}

export default Day