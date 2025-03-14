'use client';
import BottomNavbar from '@/components/bottomNavbar';
import Button from '@/components/button';
import { Input } from '@/components/input';
import StyledPinInput from '@/components/pinInput';
import useFetch from '@/hooks/useFetch';
import { ArrowLeft2, Star1 } from 'iconsax-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { toast } from 'react-toastify';

const RefCodeReader = dynamic(() => import('@/components/RefCodeReader'), {
	ssr: false,
});

const INITIAL_PIN = ['', '', '', '', '', ''];

export default function Home() {
	const router = useRouter();
	const [hash, setHash] = useState<string>(
		'user=%7B%22id%22%3A54200739%2C%22first_name%22%3A%22Alireza%22%2C%22last_name%22%3A%22T%F0%9F%98%B6%E2%80%8D%F0%9F%8C%AB%EF%B8%8F%22%2C%22username%22%3A%22Alirezatahani%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaAyicCE7F5eB_SotoFbqxPKvMBHC9yaN3qC9sfiO5vI.svg%22%7D&chat_instance=-7698407457638000439&chat_type=channel&auth_date=1741799967&signature=lBlMh8cBmWOtSGSmQQlwIjyXIM9zeoXuRvph7t2BP_Njo2G4MIAAC90673JKmZd-YEWphaJOI9cf0ypZmFIdDw&hash=a3757662399c70bf71859bc60c6fe52782e077ee74d9b4a35ad801e70fed0ec6',
	);
	const [isVisible, setIsVisible] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [telegramIsActive, setTelegramIsActive] = useState<boolean>(false);
	const [firstTime, setFirstTime] = useState<boolean>(false);
	const [step, setStep] = useState<1 | 2>(1);
	const [refCode, setRefCode] = useState<string | null>(null);
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
			toast.success('کد تایید به شماره تلفن شما ارسال شد.');
		},
	});
	const [verifyCodeState, verifyCode] = useFetch({
		onSuccess(res) {
			setIsVisible(false);
			toast.success('شما با موفقیت ثبت نام کردید.');
		},
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
		setFirstTime(true);
		return () => clearTimeout(interval);
	}, []);

	useEffect(() => {
		if (hash) {
			console.log(refCode, 'refCode');
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
				if (
					userProfileState?.response?.user?.joined_channels.includes(
						socialsState?.response?.social_user_name,
					)
				) {
					setTelegramIsActive(true);
				} else {
					checkSocial({
						url: 'social/check-join',
						method: 'POST',
						data: {
							socialId: response._id,
						},
					});
				}
			});
		}
	}, [socialsState]);

	console.log(userProfileState, 'userProfileState');
	console.log(hash, 'hash');
	console.log(
		hash && userProfileState.isSucceed,
		'hash && userProfileState.isSucceed',
	);
	return (
		<div className="p-4 overflow-hidden h-screen flex flex-col items-center justify-between">
			<Suspense fallback={null}>
				<RefCodeReader setRefCode={setRefCode} />
			</Suspense>
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
						امتیاز شما
					</span>
					<Image
						src="/assets/images/trophy2.webp"
						alt="trophy"
						width={28}
						height={28}
					/>

					<ArrowLeft2 size="18" color="#666666" />

					<span className="text-lg text-[#808080] text-center font-bold">
						{userProfileState?.response?.user?.total_scores.toLocaleString(
							'fa-IR',
						)}
					</span>
				</div>
			</div>
			<div className="pb-[90px] flex flex-col items-center gap-3 w-full">
				{userProfileState?.response &&
					!userProfileState?.response?.user?.mobile_number && (
						<div
							className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] "
							onClick={() =>
								!userProfileState?.response?.user?.mobile_number &&
								setIsVisible(true)
							}
						>
							<div className="flex flex-row items-center gap-1">
								<Star1 size="18" color="#fcfcfc" variant="Bulk" />
								<span className="text-base font-bold text-white text-right">
									ثبت شماره موبایل
								</span>{' '}
								<span className="text-sm text-white pr-1">
									(برای شرکت در قرعه کشی)
								</span>
							</div>
							<ArrowLeft2 size="18" color="#666666" />
						</div>
					)}
				<Link
					className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] "
					href="https://t.me/padash_sarmayeh"
				>
					<div className="flex flex-row items-center gap-1">
						<Star1
							size="18"
							color={telegramIsActive ? '#4d9ce2' : '#fcfcfc'}
							variant="Bulk"
						/>
						<span className="text-base font-bold text-white text-right">
							کانال تلگرام گروه مالی پاداش
						</span>
					</div>
					<ArrowLeft2 size="18" color="#666666" />
				</Link>
				<div className="w-[100%] bg-[#151515] rounded-lg flex items-center justify-between p-2 border-[#393939] border-[1px] ">
					<div className="flex flex-row items-center gap-1">
						<Star1 size="18" color="#fcfcfc" variant="Bulk" />
						<span className="text-base font-bold text-white text-right">
							سوابق امتیازات دریافت شده{' '}
						</span>
					</div>
					<ArrowLeft2 size="18" color="#666666" />
				</div>
			</div>
			<Drawer
				open={Boolean(firstTime && (!hash || !userProfileState.isSucceed))}
				direction="bottom"
				onClose={onClose}
				size="100vh"
				className="!bg-[#171717]"
			>
				<div
					className="w-full h-screen flex justify-center items-center"
					style={{ background: 'linear-gradient(0deg, #0a0a0a, #16140c)' }}
				>
					<Image
						src="/assets/images/logo.png"
						alt="Logo"
						width={258}
						height={258}
						className="splash-screen-logo"
					/>
				</div>
			</Drawer>
			<Drawer
				open={isVisible}
				direction="bottom"
				onClose={onClose}
				size={500}
				className="!bg-[#171717] p-6"
			>
				{step === 1 && (
					<div className="w-full h-96 pt-10 flex justify-start items-center flex-col gap-6">
						<div className="w-full flex justify-center items-center">
							<span className="text-lg text-white text-center font-bold px-10">
								لطفا شماره تلفن همراه خود را وارد نمایید{' '}
							</span>
						</div>

						<Input
							placeholder="شماره تلفن همراه"
							ref={inputRef}
							inputMode="numeric"
						/>
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
							isError={verifyCodeState?.isFailed}
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
