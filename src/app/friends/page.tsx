'use client';

export default function Friends() {
	return (
		<div
			className="p-4 overflow-hidden w-full flex flex-col justify-between items-center"
			style={{ height: 'calc(100vh - 90px)' }}
		>
			<div className="w-full flex flex-col justify-right items-start mt-4 gap-2">
				<span className="text-3xl text-white text-right font-bold">
					معرفی دوستان
				</span>

				<span className="text-xl text-[#5b5b5b] text-right font-bold">
					با <span className="text-[#fafafa]">معرفی</span> هر کدام از دوستانتان
					<span className="text-[#fafafa] pr-1">۱۰۰۰ امتیاز</span> اضافه کنید و
					شانس خود را افزایش دهید{' '}
				</span>
			</div>
			<div className="bg-[#131313] rounded-md p-2 w-full">
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
