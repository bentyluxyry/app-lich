/* --- THUẬT TOÁN ÂM LỊCH VIỆT NAM (HỒ NGỌC ĐỨC) --- */
const PI = Math.PI;

function INT(d) { return Math.floor(d); }

function jdn(dd, mm, yy) {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    return dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
}

function getSunLongitude(dayNumber, timeZone) {
    const T = (dayNumber - 0.5 - timeZone / 24.0 - 2451545.0) / 36525;
    const T2 = T * T;
    const dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - PI * 2 * INT(L / (PI * 2));
    return INT(L / PI * 180 / 30);
}

function getNewMoonDay(k, timeZone) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = PI / 180;
    const Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * M * dr);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * Mpr * dr);
    C1 = C1 - 0.0004 * Math.sin(3 * Mpr * dr);
    C1 = C1 + 0.0104 * Math.sin(2 * F * dr) - 0.0051 * Math.sin((M + Mpr) * dr);
    C1 = C1 - 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
    C1 = C1 - 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
    C1 = C1 + 0.001 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((M + 2 * Mpr) * dr);
    const deltat = (T < -11) ? (0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3) : (-0.000278 + 0.000265 * T + 0.000262 * T2);
    return INT(Jd1 + C1 - deltat + 0.5 + timeZone / 24.0);
}

function getLunarMonth11(yy, timeZone) {
    const off = jdn(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
    return nm;
}

function getLeapMonthOffset(a11, timeZone) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
        last = arc;
        i++;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
}

function convertSolar2Lunar(dd, mm, yy, timeZone) {
    const dayNumber = jdn(dd, mm, yy);
    const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);

    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear = yy;

    if (a11 >= monthStart) {
        lunarYear = yy;
        a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
        lunarYear = yy + 1;
        b11 = getLunarMonth11(yy + 1, timeZone);
    }

    const lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
        const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;
            if (diff === leapMonthDiff) lunarLeap = 1;
        }
    }

    if (lunarMonth > 12) lunarMonth = lunarMonth - 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
}

/* --- CONSTANTS & HELPERS --- */
const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
const CHI = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
const CHI_NGAY = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const GIO_HOANG_DAO = {
    "Tý": "Tý (23-1), Sửu (1-3), Mão (5-7), Ngọ (11-13), Thân (15-17), Dậu (17-19)",
    "Sửu": "Dần (3-5), Mão (5-7), Tỵ (9-11), Thân (15-17), Tuất (19-21), Hợi (21-23)",
    "Dần": "Tý (23-1), Sửu (1-3), Thìn (7-9), Tỵ (9-11), Mùi (13-15), Tuất (19-21)",
    "Mão": "Tý (23-1), Dần (3-5), Mão (5-7), Ngọ (11-13), Mùi (13-15), Dậu (17-19)",
    "Thìn": "Dần (3-5), Thìn (7-9), Tỵ (9-11), Thân (15-17), Dậu (17-19), Hợi (21-23)",
    "Tỵ": "Sửu (1-3), Thìn (7-9), Ngọ (11-13), Mùi (13-15), Tuất (19-21), Hợi (21-23)",
    "Ngọ": "Tý (23-1), Sửu (1-3), Mão (5-7), Ngọ (11-13), Thân (15-17), Dậu (17-19)",
    "Mùi": "Dần (3-5), Mão (5-7), Tỵ (9-11), Thân (15-17), Tuất (19-21), Hợi (21-23)",
    "Thân": "Tý (23-1), Sửu (1-3), Thìn (7-9), Tỵ (9-11), Mùi (13-15), Tuất (19-21)",
    "Dậu": "Tý (23-1), Dần (3-5), Mão (5-7), Ngọ (11-13), Mùi (13-15), Dậu (17-19)",
    "Tuất": "Dần (3-5), Thìn (7-9), Tỵ (9-11), Thân (15-17), Dậu (17-19), Hợi (21-23)",
    "Hợi": "Sửu (1-3), Thìn (7-9), Ngọ (11-13), Mùi (13-15), Tuất (19-21), Hợi (21-23)"
};

function getNguHanh(canIndex, chiIndex) {
    const valCan = [4, 4, 5, 5, 1, 1, 2, 2, 3, 3];
    const valChi = [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2];
    let sum = valCan[canIndex] + valChi[chiIndex];
    if (sum > 5) sum -= 5;
    const names = { 1: "Hành Kim", 2: "Hành Thủy", 3: "Hành Hỏa", 4: "Hành Thổ", 5: "Hành Mộc" };
    return names[sum] || "Bình Hòa";
}

function getTuoiXung(chiName) {
    const mapXung = {
        "Tý": "Ngọ, Mão, Dậu", "Sửu": "Mùi, Thìn, Tuất", "Dần": "Thân, Tỵ, Hợi",
        "Mão": "Dậu, Tý, Ngọ", "Thìn": "Tuất, Sửu, Mùi", "Tỵ": "Hợi, Dần, Thân",
        "Ngọ": "Tý, Mão, Dậu", "Mùi": "Sửu, Thìn, Tuất", "Thân": "Dần, Tỵ, Hợi",
        "Dậu": "Mão, Tý, Ngọ", "Tuất": "Thìn, Sửu, Mùi", "Hợi": "Tỵ, Dần, Thân"
    };
    return mapXung[chiName] ? `${mapXung[chiName]}` : "";
}

/* --- EXPORTS --- */
export function getDayInfo(date) {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const timeZone = 7;

    const [lDay, lMonth, lYear, lLeap] = convertSolar2Lunar(dd, mm, yyyy, timeZone);
    const jd = jdn(dd, mm, yyyy);
    
    // Can Chi Ngày
    const canNgay = CAN[(jd + 9) % 10];
    const chiNgay = CHI_NGAY[(jd + 1) % 12];
    
    // Can Chi Năm
    const canNam = CAN[lYear % 10];
    const chiNam = CHI[lYear % 12];
    
    // Can Chi Tháng
    const yearCanIndex = lYear % 10;
    const thangKhoiDau = [8, 0, 2, 4, 6, 8, 0, 2, 4, 6]; 
    const canThangIndex = (thangKhoiDau[yearCanIndex] + (lMonth - 1)) % 10;
    const canThang = CAN[canThangIndex];
    const chiThang = CHI_NGAY[(lMonth + 1) % 12]; // Tháng 1 Âm là tháng Dần (index 2) nhưng thuật toán này trả về index chuẩn

    return {
        gregorian: date,
        lunar: {
            day: lDay,
            month: lMonth,
            yearName: `${canNam} ${chiNam}`,
            dayName: `${canNgay} ${chiNgay}`,
            monthName: `${canThang} ${chiThang}`,
            isLeap: lLeap === 1
        },
        zodiacHours: GIO_HOANG_DAO[chiNgay] || "Đang cập nhật",
        element: getNguHanh((jd + 9) % 10, (jd + 1) % 12),
        conflictingAge: getTuoiXung(chiNgay)
    };
}

export function formatWeekDay(date) {
    return new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(date);
}

export function generateMonthGrid(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    const days = [];
    
    // Previous Month
    for (let i = startDayOfWeek; i > 0; i--) {
        days.push({ date: new Date(year, month, 1 - i), isCurrentMonth: false, lunar: {day:0, month:0} });
    }
    // Current Month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month, i);
        const lInfo = getDayInfo(d).lunar;
        days.push({ date: d, isCurrentMonth: true, lunar: lInfo });
    }
    // Next Month
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
        days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false, lunar: {day:0, month:0} });
    }
    return days;
}

export function renderDailyDetailHTML(date) {
    const info = getDayInfo(date);
    const weekDay = formatWeekDay(date);

    return `
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden font-sans">
        <div class="flex flex-col md:flex-row h-full">
            <div class="flex-1 p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center relative">
                <button onclick="app.changeDate(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 hover:border-green-500 hover:text-green-600 flex items-center justify-center transition">❮</button>
                <div class="flex items-center gap-2 mb-2">
                    <span class="w-6 h-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">☀</span>
                    <span class="text-gray-500 font-bold text-xs uppercase tracking-widest">Dương Lịch</span>
                </div>
                <div class="text-[120px] leading-none font-bold text-green-600 font-sans my-2 tracking-tighter">${info.gregorian.getDate()}</div>
                <div class="text-xl text-gray-600 font-medium">Tháng ${info.gregorian.getMonth() + 1} năm ${info.gregorian.getFullYear()}</div>
                <div class="mt-2 text-green-600 font-bold text-2xl capitalize">${weekDay}</div>
            </div>
            <div class="flex-1 p-8 flex flex-col items-center justify-center relative bg-gray-50/50">
                <button onclick="app.changeDate(1)" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 hover:border-green-500 hover:text-green-600 flex items-center justify-center transition">❯</button>
                <div class="flex items-center gap-2 mb-2">
                     <span class="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">🌙</span>
                     <span class="text-gray-500 font-bold text-xs uppercase tracking-widest">Âm Lịch</span>
                </div>
                <div class="text-[120px] leading-none font-bold text-gray-800 font-sans my-2 tracking-tighter">${info.lunar.day}</div>
                <div class="text-xl text-gray-800 font-medium text-center">Tháng ${info.lunar.month} ${info.lunar.isLeap ? '(Nhuận)' : ''} - Năm ${info.lunar.yearName}</div>
                <div class="mt-2 text-gray-600">Ngày ${info.lunar.dayName}</div>
            </div>
        </div>
        <div class="bg-gray-50 p-6 border-t border-gray-200 text-sm grid gap-2 grid-cols-1 md:grid-cols-2">
            <div><span class="font-bold">Giờ Hoàng Đạo:</span> ${info.zodiacHours.split(',').slice(0,3).join(', ')}...</div>
            <div><span class="font-bold">Ngũ Hành:</span> ${info.element}</div>
            <div class="md:col-span-2"><span class="font-bold">Tuổi xung:</span> ${info.conflictingAge}</div>
        </div>
    </div>`;
}

export function renderCalendarGridHTML(date) {
    const grid = generateMonthGrid(date.getFullYear(), date.getMonth());
    const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
    return `
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
         <div class="flex justify-between items-center p-4 border-b border-gray-100">
            <div class="flex gap-2">
                <button onclick="app.changeMonth(-1)" class="hover:bg-gray-100 p-1 rounded">❮</button>
                <span class="font-bold text-lg">Tháng ${date.getMonth() + 1} - ${date.getFullYear()}</span>
                <button onclick="app.changeMonth(1)" class="hover:bg-gray-100 p-1 rounded">❯</button>
            </div>
            <button onclick="app.selectDate(new Date().toISOString())" class="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded">Hôm nay</button>
         </div>
         <div class="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
             ${weekDays.map((d, i) => `<div class="py-3 text-center text-xs font-bold text-gray-500 uppercase ${i===6 ? 'text-red-500' : ''}">${d}</div>`).join('')}
         </div>
         <div class="grid grid-cols-7">
             ${grid.map(day => {
                const isSelected = day.date.toDateString() === date.toDateString();
                const isToday = day.date.toDateString() === new Date().toDateString();
                return `
                    <div onclick="app.selectDate('${day.date.toISOString()}')" 
                         class="min-h-[80px] p-2 border-r border-b border-gray-50 cursor-pointer relative hover:bg-green-50 
                         ${isSelected ? 'bg-green-100' : 'bg-white'} 
                         ${!day.isCurrentMonth ? 'opacity-30 bg-gray-50' : ''}">
                         <div class="flex justify-between">
                             <span class="text-lg font-semibold ${day.date.getDay()===0?'text-red-500':'text-gray-700'}">${day.date.getDate()}</span>
                             <span class="text-xs ${day.lunar.day===1||day.lunar.day===15?'text-red-500 font-bold':'text-gray-400'}">${day.lunar.day}</span>
                         </div>
                         ${day.lunar.isLeap ? '<span class="text-[9px] text-green-600 block text-right">(N)</span>' : ''}
                         ${isToday ? '<div class="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>' : ''}
                    </div>`;
             }).join('')}
         </div>
    </div>`;
}