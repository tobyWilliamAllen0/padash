'use client';
import Button from '@/components/button';
import { Input } from '@/components/input';
import StyledPinInput from '@/components/pinInput';
import useFetch from '@/hooks/useFetch';
import { ArrowRight2, Star1 } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useCallback, useEffect, useRef, useState } from 'react';
import Drawer from 'react-bottom-drawer';
import ScaleLoader from 'react-spinners/ScaleLoader';

const INITIAL_PIN = ['', '', '', '', '', ''];

export default function Home() {
	const router = useRouter();
	const [hash, setHash] = useState<string>('');
	const [isVisible, setIsVisible] = useState(false);
	const [step, setStep] = useState<1 | 2>(1);
	const [mobilePin, setMobilePin] = useState<string[]>(INITIAL_PIN);

	const inputRef = useRef<HTMLInputElement>(null);

	const [userProfileState, fetchUserProfile] = useFetch({
		onSuccess(res: any) {
			setCookie(null, 'userProfile', JSON.stringify(res), {
				path: '/',
				maxAge: 30 * 24 * 60 * 60,
				sameSite: true,
			});
		},
	});

	const [socialsState, fetchSocials] = useFetch();

	const [socialsCheckState, checkSocial] = useFetch();
	const [submitPhoneNumberState, submitPhoneNumber] = useFetch({
		onSuccess(res) {
			setStep(2);
		},
	});
	const [verifyCodeState, verifyCode] = useFetch({
		onSuccess(res) {},
	});

	const onClose = useCallback(() => {
		setIsVisible(false);
	}, []);

	const handleSubmitPhone = () => {
		if (inputRef.current) {
			submitPhoneNumber({
				url: 'user/submit-mobile-number',
				method: 'POST',
				data: {
					mobile_number: inputRef.current.value,
				},
			});
		}
	};
	const handleVerifyPhone = () => {
		if (inputRef.current) {
			verifyCode({
				url: 'user/verify-mobile-number',
				method: 'POST',
				data: {
					mobile_number: inputRef.current.value,
					code: mobilePin.join(''),
				},
			});
		}
	};

	useEffect(() => {
		const interval = setTimeout(() => {
			const app =
				typeof window !== 'undefined' ? (window as any)?.Telegram?.WebApp : {};

			if (app) {
				console.log(app.initData, 'app.initData');
				setHash(app.initData);

				fetchSocials({
					url: 'social',
					method: 'GET',
				});
			}
		}, 2000);

		return () => clearTimeout(interval);
	}, []);

	useEffect(() => {
		if (hash) {
			fetchUserProfile({
				url: 'user/profile',
				method: 'POST',
				data: {
					hash: hash.toString(),
				},
			});
		}
	}, [hash]);

	useEffect(() => {
		if (socialsState?.response) {
			socialsState.response.map((response: any) => {
				checkSocial({
					url: 'social/check-join',
					method: 'POST',
					data: {
						socialId: response._id,
					},
				});
			});
		}
	}, [socialsState]);

	return (
		<div className="p-4 overflow-hidden h-screen flex flex-col items-center justify-between">
			<div className="flex flex-col items-center">
				<div className="w-[258px] h-[258px] flex items-center justify-center text-4xl">
					<Image
						src="/assets/images/logo.png"
						alt="Logo"
						width={258}
						height={258}
					/>
				</div>
				<div className="w-full flex justify-center items-center">
					<span className="text-lg text-white text-center font-bold px-10">
						سال پاداش: جشنواره جوایز ۱۰ سالگی گروه مالی پاداش
					</span>
				</div>
				<div className="w-full flex justify-center items-center mt-4 gap-1">
					<span className="text-lg text-[#808080] text-center font-bold">
						{userProfileState?.response?.user?.total_scores.toLocaleString(
							'fa-IR',
						)}
					</span>
					<ArrowRight2 size="18" color="#666666" />

					<span className="text-lg text-[#808080] text-center font-bold">
						امتیاز شما
					</span>
					<Image
						src="/assets/images/trophy2.webp"
						alt="trophy"
						width={28}
						height={28}
					/>
				</div>
			</div>
			<div className="pb-[90px] flex flex-col items-center gap-3 w-full">
				<div
					className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] "
					onClick={() => setIsVisible(true)}
				>
					<div className="flex flex-row items-center gap-1">
						<ArrowRight2 size="18" color="#666666" />
						<span className="text-base font-bold text-white text-right">
							ثبت شماره موبایل
						</span>{' '}
						<span className="text-sm text-white pr-1">
							(برای شرکت در قرعه کشی)
						</span>
					</div>
					<Star1 size="18" color="#fcfcfc" variant="Bulk" />
				</div>
				<div
					className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] "
					onClick={() => router.push('https://t.me/padash_sarmayeh')}
				>
					<div className="flex flex-row items-center gap-1">
						<ArrowRight2 size="18" color="#666666" />
						<span className="text-base font-bold text-white text-right">
							کانال تلگرام گروه مالی پاداش
						</span>
					</div>
					<Star1 size="18" color="#fcfcfc" variant="Bulk" />
				</div>
				<div className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] ">
					<div className="flex flex-row items-center gap-1">
						<ArrowRight2 size="18" color="#666666" />
						<span className="text-base font-bold text-white text-right">
							سوابق امتیازات دریافت شده{' '}
						</span>
					</div>
					<Star1 size="18" color="#fcfcfc" variant="Bulk" />
				</div>
			</div>

			<Drawer isVisible={isVisible} onClose={onClose} className="!bg-[#171717]">
				{step === 1 && (
					<div className="w-full h-96 pt-10 flex justify-start items-center flex-col gap-6">
						<div className="w-full flex justify-center items-center">
							<span className="text-lg text-white text-center font-bold px-10">
								لطفا شماره تلفن همراه خود را وارد نمایید{' '}
							</span>
						</div>

						<Input placeholder="شماره تلفن همراه" ref={inputRef} />
						<Button onClick={handleSubmitPhone}>
							{submitPhoneNumberState.isLoading ? (
								<ScaleLoader
									color="#fff"
									loading={submitPhoneNumberState.isLoading}
									aria-label="Loading Spinner"
									data-testid="loader"
									height={15}
								/>
							) : (
								<span className="text-[#24242B]">ثبت</span>
							)}
						</Button>
					</div>
				)}
				{step === 2 && (
					<div className="w-full h-96 pt-10 flex justify-start items-center flex-col gap-6">
						<div className="w-full flex justify-center items-center">
							<span className="text-lg text-white text-center font-bold px-10">
								لطفا کد ارسال شده به شماره تلفن همراه خود را وارد نمایید{' '}
							</span>
						</div>

						<StyledPinInput
							values={mobilePin}
							onChange={(_value, _index, values) => setMobilePin(values)}
						/>
						<Button onClick={handleVerifyPhone}>
							{submitPhoneNumberState.isLoading ? (
								<ScaleLoader
									color="#fff"
									loading={submitPhoneNumberState.isLoading}
									aria-label="Loading Spinner"
									data-testid="loader"
									height={15}
								/>
							) : (
								<span className="text-[#24242B]">ثبت</span>
							)}
						</Button>
					</div>
				)}
			</Drawer>
		</div>
	);
}
