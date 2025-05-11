import ImageWithLoader from "./ImageWithLoader";

export default function Ads1() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 lg:p-20 px-4 md:px-20 lg:px-50 rounded-xl gap-8 md:gap-0">
            {/* Left side - Arabic text and price */}
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 text-center md:text-right">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-gray-300" dir="rtl">
                    عرض خاص
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-white" dir="rtl">
                    احصل على مشروعك الاول بأسعار مناسبة
                </p>
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600" dir="rtl">
                    اشتري الان
                </div>
            </div>

            <div>
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
                    <ImageWithLoader
                        src={"/images/iconBlue.png"}
                        alt="logo"
                        width={600}
                        height={600}
                        className="relative z-10 w-full h-full object-contain"
                    />
                    <ImageWithLoader
                        src={"/images/worker.png"}
                        alt="product"
                        width={550}
                        height={550}
                        className="absolute top-[55.5%] left-[33%] transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-[300px] max-w-[300px] md:max-h-[400px] md:max-w-[400px]  lg:max-h-[550px] lg:max-w-[550px] z-20 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}