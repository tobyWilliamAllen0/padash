'use client';

export default function Friends() {
	return (
		<div className="p-4 overflow-hidden">
			<div className="w-[100%] h-[150px] border-dashed border-2 border-red-500 mt-2 flex items-center justify-center text-4xl">
				350 * 150
			</div>
			<div className="w-full flex justify-center items-center mt-2">
				<span className="text-lg text-white text-center font-bold px-10">
					با معرفی هر کدام از دوستانتان ۱/۰۰۰ امتیاز اضافه کنید و شانس خود را
					افزایش دهید{' '}
				</span>
			</div>
			<div className="bg-[#131313] rounded-md p-2">
				<div className="w-full flex justify-between items-center mt-2 p-2 bg-[#262626] rounded-md">
					<span className="text-base text-white font-bold">۵ نفر</span>
					<span className="text-base text-white font-bold">۵/۰۰۰ امتیاز</span>
				</div>
				<div className="w-full flex justify-between items-center mt-2">
					<span className="text-base text-white ">داود صمدی</span>
					<span className="text-base text-white ">۱/۰۰۰ امتیاز</span>
				</div>
				<div className="w-full flex justify-between items-center mt-2">
					<span className="text-base text-white ">زهرا لطفی</span>
					<span className="text-base text-white ">۱/۰۰۰ امتیاز</span>
				</div>
				<div className="w-full flex justify-between items-center mt-2 ">
					<span className="text-base text-white ">سهراب صفایی</span>
					<span className="text-base text-white ">۱/۰۰۰ امتیاز</span>
				</div>
				<div className="w-full flex justify-between items-center mt-2">
					<span className="text-base text-white ">احمد رضایی</span>
					<span className="text-base text-white ">۱/۰۰۰ امتیاز</span>
				</div>
			</div>
			<button className="rounded-md bg-[#1f9ee7] text-white font-bold text-lg w-full mt-6 p-2">
				دعوت از دوستان
			</button>
		</div>
	);
}
