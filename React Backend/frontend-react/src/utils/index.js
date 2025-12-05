import dayjs from "dayjs";
import "dayjs/locale/id";
import duration from "dayjs/plugin/duration";

dayjs.locale("id");
dayjs.extend(duration);

function formatDurasi(timeString) {
  const [jam, menit, detik] = timeString.split(":").map(Number);
  const totalDetik = jam * 3600 + menit * 60 + detik;

  const h = Math.floor(totalDetik / 3600);
  const sisaSetelahJam = totalDetik % 3600;
  const m = Math.floor(sisaSetelahJam / 60);
  const s = sisaSetelahJam % 60;

  if (totalDetik < 60) {
    return `${s} detik`;
  } 
  else if (h === 0 && s === 0) {
    return `${m} menit`;
  } 
  else if (h === 0) {
    return `${m} menit ${s} detik`;
  } 
  else if (m === 0 && s === 0) {
    return `${h} jam`;
  } 
  else if (s === 0) {
    return `${h} jam ${m} menit`;
  }
  else {
    return `${h} jam ${m} menit ${s} detik`;
  }
}

export { formatDurasi };
