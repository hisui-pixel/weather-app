export function getBackgroundClass(weatherMain: string): string {
  switch (weatherMain) {
    case "Clear":
      return "bg-gradient-to-b from-sky-400 to-sky-200"; // 晴れ
    case "Clouds":
      return "bg-gradient-to-b from-slate-500 to-blue-100"; // 曇り
    case "Rain":
    case "Drizzle":
      return "bg-gradient-to-b from-slate-600 to-slate-400"; // 雨
    case "Thunderstorm":
      return "bg-gradient-to-b from-gray-800 to-gray-600"; // 雷
    case "Snow":
      return "bg-gradient-to-b from-blue-100 to-white"; // 雪
    default:
      return "bg-gradient-to-b from-gray-300 to-gray-100";
  }
}