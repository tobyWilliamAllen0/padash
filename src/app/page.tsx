'use client';
import BottomNavbar from '@/components/bottomNavbar';
import Button from '@/components/button';
import { Input } from '@/components/input';
import StyledPinInput from '@/components/pinInput';
import useFetch from '@/hooks/useFetch';
import { ArrowRight2, Star1 } from 'iconsax-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'nookies';
import { useCallback, useEffect, useRef, useState } from 'react';
import Drawer from 'react-bottom-drawer';
import ScaleLoader from 'react-spinners/ScaleLoader';

const INITIAL_PIN = ['', '', '', '', '', ''];

export default function Home() {
	const router = useRouter();
	const [hash, setHash] = useState<string>(
		'user=%7B%22id%22%3A54200739%2C%22first_name%22%3A%22Alireza%22%2C%22last_name%22%3A%22T%F0%9F%98%B6%E2%80%8D%F0%9F%8C%AB%EF%B8%8F%22%2C%22username%22%3A%22Alirezatahani%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaAyicCE7F5eB_SotoFbqxPKvMBHC9yaN3qC9sfiO5vI.svg%22%7D&chat_instance=-1916207976170099950&chat_type=sender&auth_date=1739546970&signature=zRO5sAFS86L3f2aBUdNpCD66dVbXa7GsMmeCjj7eOzMbrUL8WXjim9-bbKTmQf0qWHzftFO9DUnWwRXqPGaDCQ&hash=99570ed1c34ab9f1ce8b1228b986db81e6fc0ddc575f87f8432844b7259b746a',
	);
	const [isVisible, setIsVisible] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [step, setStep] = useState<1 | 2>(1);
	const [refCode, setRefCode] = useState<string | null>(null);
	const [mobilePin, setMobilePin] = useState<string[]>(INITIAL_PIN);
	const searchParams = useSearchParams(); // Use search params hook

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
			setPhoneNumber(inputRef.current.value);
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
		if (phoneNumber && mobilePin.join('') !== '') {
			verifyCode({
				url: 'user/verify-mobile-number',
				method: 'POST',
				data: {
					mobile_number: phoneNumber,
					code: mobilePin.join(''),
				},
			});
		}
	};
	const getRefCodeFromUrl = useCallback(() => {
		// Check for startApp parameter (case sensitive)
		let code = searchParams.get('startApp');

		// If not found, check for startapp parameter (lowercase)
		if (!code) {
			code = searchParams.get('startapp');
		}

		if (code) {
			console.log('Referral code found:', code);
			setRefCode(code);

			// Store the referral code in localStorage for later use
			localStorage.setItem('referralCode', code);

			// You might want to include this in your API calls
			// For example, when submitting phone number
		}
	}, [searchParams]);

	useEffect(() => {
		const interval = setTimeout(() => {
			const app =
				typeof window !== 'undefined' ? (window as any)?.Telegram?.WebApp : {};

			if (app) {
				getRefCodeFromUrl();
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
					...(refCode ? { referral_code: refCode } : {}),
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
							{verifyCodeState.isLoading ? (
								<ScaleLoader
									color="#fff"
									loading={verifyCodeState.isLoading}
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
			<BottomNavbar />
		</div>
	);
}
